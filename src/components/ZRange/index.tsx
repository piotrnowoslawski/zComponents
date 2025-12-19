import {
  ChangeEvent,
  MouseEvent,
  TouchEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { classNames } from "../../helpers/classNames";
import { checkIsInputSwapAllowed } from "./helpers/checkIsInputSwapAllowed";
import { getMinMax } from "./helpers/getMinMax";
import { ZRangeValue } from "./rangeValue";
import { ScaleFunction, ZRangeProps } from "./types/zRangeTypes";
import styles from "./styles/ZRange.module.scss";
import { getCssVariablePxValue } from "./helpers/getCssVariablePxValue";
import ZRangeSliderValue from "./components/ZRangeSliderValue";
import ZRangeIndicator from "./components/ZRangeIndicator";
import ZRangeTrack from "./components/ZRangeTrack";
import ZRangeInputs from "./components/ZRangeInputs";
import ZRangeLabel from "./components/ZRangeLabel";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

const ZRange = (props: ZRangeProps) => {
  const {
    value,
    name,
    min,
    max,
    step,
    scale,
    unitDivisors,
    unitList,
    label,
    onSelect,
    onChange,
    icons,
    stylesClasses,
    isIndicatorUnitHidden,
  } = props;

  const scaleFunction: ScaleFunction = (x) =>
    // eslint-disable-next-line no-new-func
    scale ? new Function("x", `return ${scale}`)(x) : x;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const rangeTrackRef = useRef<HTMLDivElement | null>(null);
  const selectedRangeRef = useRef<HTMLDivElement | null>(null);
  const valueIndicatorRef = useRef<HTMLDivElement | null>(null);
  const thumbOffsetRef = useRef<{ 0: number; 1: number }>({ 0: 0, 1: 0 });

  const [indicatorValue, setIndicatorValue] = useState<number | undefined>(
    undefined
  );
  const [activeInputIndex, setActiveInputIndex] = useState<number>(0);

  const [rangeValue, setRangeValue] = useState<ZRangeValue>(
    new ZRangeValue(
      {
        value: typeof value?.min === "number" ? value.min : min,
        initialValue: min,
        inputRef: useRef<HTMLInputElement | null>(null),
      },
      {
        value: typeof value?.max === "number" ? value.max : max,
        initialValue: max,
        inputRef: useRef<HTMLInputElement | null>(null),
      },
      unitDivisors,
      unitList,
      scaleFunction
    )
  );

  const [clientPositionX, setClientPositionX] = useState<number | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const [selectedRangeStyle, setSelectedRangeStyle] = useState<any>({
    width: 0,
    left: 0,
    right: 0,
  });

  const stepValue = typeof step === "number" && step > 0 ? step : 1;
  const maxForInput = min + Math.ceil((max - min) / stepValue) * stepValue;

  const mapValueToInputRange = (domainValue: number) =>
    domainValue >= max ? maxForInput : domainValue;

  const mapInputRangeToValue = (inputValue: number) =>
    Math.min(inputValue, max);

  const rangeValueForInput = useMemo(() => {
    return new ZRangeValue(
      {
        ...rangeValue.min,
        value: mapValueToInputRange(rangeValue.min.value),
        initialValue: min,
        inputRef: rangeValue.min.inputRef,
      },
      {
        ...rangeValue.max,
        value: mapValueToInputRange(rangeValue.max.value),
        initialValue: maxForInput,
        inputRef: rangeValue.max.inputRef,
      },
      unitDivisors,
      unitList,
      scaleFunction
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    rangeValue.min.value,
    rangeValue.max.value,
    min,
    max,
    maxForInput,
    stepValue,
    unitDivisors,
    unitList,
    scale,
  ]);

  const containerClasses = classNames(
    styles["z-range__container"],
    stylesClasses?.container
  );

  const inputMinClasses = classNames(
    "z-range__input",
    "z-range__input-first",
    {
      "z-range__input--active": activeInputIndex === 0 && isHighlighted,
    },
    stylesClasses?.input,
    activeInputIndex === 0 && isHighlighted && stylesClasses?.inputActive
      ? stylesClasses?.inputActive
      : ""
  );

  const inputMaxClasses = classNames(
    "z-range__input",
    "z-range__input-second",
    { "z-range__input--active": activeInputIndex === 1 && isHighlighted },
    stylesClasses?.input,
    activeInputIndex === 1 && isHighlighted && stylesClasses?.inputActive
      ? stylesClasses?.inputActive
      : ""
  );

  useEffect(() => {
    if (!value) return;

    const nextMin = clamp(value.min, min, max);
    const nextMax = clamp(value.max, min, max);

    const nextRangeValue = new ZRangeValue(
      {
        ...rangeValue.min,
        value: nextMin,
        initialValue: min,
        inputRef: rangeValue.min.inputRef,
      },
      {
        ...rangeValue.max,
        value: nextMax,
        initialValue: max,
        inputRef: rangeValue.max.inputRef,
      },
      unitDivisors,
      unitList,
      scaleFunction
    );

    setRangeValue(nextRangeValue);
    setIndicatorValue(undefined);
    thumbOffsetRef.current[0] = 0;
    thumbOffsetRef.current[1] = 0;

    requestAnimationFrame(() => {
      const val = activeInputIndex === 0 ? nextMin : nextMax;
      setRangeValuePosition(val);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.min, value?.max, min, max]);

  const getThumbCenterXInContainer = (
    input: HTMLInputElement,
    currentValueReal: number,
    containerEl: HTMLElement
  ) => {
    const currentValue = mapValueToInputRange(currentValueReal);
    const thumbTravelRatio = clamp01(
      (currentValue - min) / (maxForInput - min)
    );

    const inputRect = input.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();

    const thumbSize = getCssVariablePxValue(input, "--thumb-size", 16);

    const usable = inputRect.width - thumbSize;
    const thumbCenterXInInput = thumbSize / 2 + usable * thumbTravelRatio;

    const inputLeftInContainer = inputRect.left - containerRect.left;

    return inputLeftInContainer + thumbCenterXInInput;
  };

  const setRangeValuePosition = (
    currentValueReal: number,
    inputIndex = activeInputIndex
  ) => {
    const indicator = valueIndicatorRef.current;
    const container = containerRef.current;

    const input =
      (inputIndex === 0
        ? rangeValue.min.inputRef.current
        : rangeValue.max.inputRef.current) ?? rangeValue.min.inputRef.current;

    if (!indicator || !container || !input) return;

    const distanceLeft = getThumbCenterXInContainer(
      input,
      currentValueReal,
      container
    );

    indicator.style.left = `${Math.round(distanceLeft)}px`;
    indicator.style.transform = `translateX(-50%)`;
  };

  const updateRangeValues = (currentValueReal: number, inputIndex: number) => {
    const updatedRangeValue = new ZRangeValue(
      {
        ...(inputIndex === 0
          ? { ...rangeValue.min, value: currentValueReal }
          : rangeValue.min),
      },
      {
        ...(inputIndex === 0
          ? rangeValue.max
          : { ...rangeValue.max, value: currentValueReal }),
      },
      rangeValue.unitDivisors,
      rangeValue.unitList,
      rangeValue.scale
    );

    setRangeValue(updatedRangeValue);
    setIndicatorValue(currentValueReal);

    if (!onChange) return;

    const { min: currentMin, max: currentMax } = getMinMax(
      updatedRangeValue.min.value,
      updatedRangeValue.max.value
    );

    onChange(
      {
        ...updatedRangeValue,
        min: { ...updatedRangeValue.min, value: currentMin },
        max: { ...updatedRangeValue.max, value: currentMax },
      },
      name
    );
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      !rangeTrackRef.current ||
      !rangeValue.min.inputRef.current ||
      !rangeValue.max.inputRef.current
    ) {
      return;
    }

    const currentValue = mapInputRangeToValue(Number(e.target.value));

    const rangeTrackRect = rangeTrackRef.current.getBoundingClientRect();
    const clientPositionOnTrack =
      clientPositionX != null ? clientPositionX - rangeTrackRect.left : null;

    const minValueStepPosition = rangeValue.getMinPosition();
    const maxValueStepPosition = rangeValue.getMaxPosition();

    if (
      checkIsInputSwapAllowed(
        activeInputIndex,
        0,
        clientPositionOnTrack,
        maxValueStepPosition
      )
    ) {
      return;
    }

    if (
      checkIsInputSwapAllowed(
        activeInputIndex,
        1,
        clientPositionOnTrack,
        minValueStepPosition
      )
    ) {
      return;
    }

    const { min: currentMin, max: currentMax } = getMinMax(
      rangeValue.min.value,
      rangeValue.max.value
    );

    const rangeMiddle = (currentMax - currentMin) / 2;

    if (rangeValue.max.value > rangeValue.min.value) {
      if (currentValue < currentMin + rangeMiddle) {
        setActiveInputIndex(0);
        setRangeValuePosition(currentValue);
        updateRangeValues(currentValue, 0);
        return;
      }

      if (currentValue > currentMin + rangeMiddle) {
        setActiveInputIndex(1);
        setRangeValuePosition(currentValue);
        updateRangeValues(currentValue, 1);
        return;
      }
    }

    if (rangeValue.min.value > rangeValue.max.value) {
      if (currentValue < currentMin + rangeMiddle) {
        setActiveInputIndex(1);
        setRangeValuePosition(currentValue);
        updateRangeValues(currentValue, 1);
        return;
      }

      if (currentValue > currentMin + rangeMiddle) {
        setActiveInputIndex(0);
        setRangeValuePosition(currentValue);
        updateRangeValues(currentValue, 0);
        return;
      }
    }

    setRangeValuePosition(currentValue);
    updateRangeValues(currentValue, activeInputIndex);
  };

  const onMoveStart = (
    e: MouseEvent<HTMLInputElement> | TouchEvent<HTMLInputElement>
  ) => {
    setIsMoving(true);
    setIsHighlighted(true);

    const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
    setClientPositionX(clientX);

    const container = containerRef.current;
    const input =
      activeInputIndex === 0
        ? rangeValue.min.inputRef.current
        : rangeValue.max.inputRef.current;

    if (container && input) {
      const containerRect = container.getBoundingClientRect();
      const pointerXInContainer = clientX - containerRect.left;

      const currentValReal =
        activeInputIndex === 0 ? rangeValue.min.value : rangeValue.max.value;

      const thumbXInContainer = getThumbCenterXInContainer(
        input,
        currentValReal,
        container
      );

      const thumbSize = getCssVariablePxValue(input, "--thumb-size", 16);
      const dist = Math.abs(pointerXInContainer - thumbXInContainer);

      thumbOffsetRef.current[activeInputIndex as 0 | 1] =
        dist <= thumbSize / 2 ? pointerXInContainer - thumbXInContainer : 0;
    }

    if (
      !rangeTrackRef.current ||
      !rangeValue.min.inputRef.current ||
      !rangeValue.max.inputRef.current
    ) {
      return;
    }

    const rangeTrackRect = rangeTrackRef.current.getBoundingClientRect();

    const clientPositionOnTrack = clientX - rangeTrackRect.left;

    const minValueStepPosition = rangeValue.getMinPosition();
    const maxValueStepPosition = rangeValue.getMaxPosition();

    if (
      checkIsInputSwapAllowed(
        activeInputIndex,
        0,
        clientPositionOnTrack,
        maxValueStepPosition
      )
    ) {
      setActiveInputIndex(1);
      thumbOffsetRef.current[1] = 0;

      setRangeValuePosition(rangeValue.max.value, 1);
      updateRangeValues(rangeValue.max.value, 1);
    }

    if (
      checkIsInputSwapAllowed(
        activeInputIndex,
        1,
        clientPositionOnTrack,
        minValueStepPosition
      )
    ) {
      setActiveInputIndex(0);
      thumbOffsetRef.current[0] = 0;

      setRangeValuePosition(rangeValue.min.value);
      updateRangeValues(rangeValue.min.value, 0);
    }
  };

  const onMove = (
    e: MouseEvent<HTMLInputElement> | TouchEvent<HTMLInputElement>
  ) => {
    if (!isMoving) return;

    e.preventDefault();
    e.stopPropagation();

    const currentPositionX =
      "clientX" in e ? e.clientX : e.touches?.[0]?.clientX;

    const element =
      activeInputIndex === 0
        ? rangeValue.min.inputRef
        : rangeValue.max.inputRef;

    if (!(element.current && currentPositionX != null)) return;

    const slider = element.current;
    const sliderRect = slider.getBoundingClientRect();

    const offsetX =
      currentPositionX -
      sliderRect.left -
      thumbOffsetRef.current[activeInputIndex as 0 | 1];

    const thumbSize = getCssVariablePxValue(slider, "--thumb-size", 16);

    const usable = Math.max(1, sliderRect.width - thumbSize);

    const posOnUsable = clamp(offsetX - thumbSize / 2, 0, usable);
    const ratio = posOnUsable / usable;

    const rawValue = min + ratio * (maxForInput - min);

    const roundedValue =
      Math.round((rawValue - min) / stepValue) * stepValue + min;

    const limitedInputValue = clamp(roundedValue, min, maxForInput);
    const limitedRealValue = mapInputRangeToValue(limitedInputValue);

    setRangeValuePosition(limitedRealValue, activeInputIndex);
    updateRangeValues(limitedRealValue, activeInputIndex);
  };

  const onMoveStop = (
    e: MouseEvent<HTMLInputElement> | TouchEvent<HTMLInputElement>
  ) => {
    setIsMoving(false);
    setIsHighlighted(false);

    if (
      !(e?.target as HTMLInputElement)?.value &&
      rangeValue.min.inputRef.current &&
      rangeValue.max.inputRef.current
    ) {
      const firstValue =
        activeInputIndex === 0
          ? mapInputRangeToValue(Number(rangeValue.min.inputRef.current?.value))
          : rangeValue.min.value;

      const secondValue =
        activeInputIndex === 1
          ? mapInputRangeToValue(Number(rangeValue.max.inputRef.current?.value))
          : rangeValue.max.value;

      const { min: lastMin, max: lastMax } = getMinMax(firstValue, secondValue);

      onSelect?.(
        {
          ...rangeValue,
          min: { ...rangeValue.min, value: lastMin },
          max: { ...rangeValue.max, value: lastMax },
        },
        name
      );

      updateRangeValues(
        activeInputIndex === 0 ? lastMin : lastMax,
        activeInputIndex
      );
      return;
    }

    const targetValueReal = mapInputRangeToValue(
      Number((e.target as HTMLInputElement).value)
    );

    const { min: currentMin, max: currentMax } = getMinMax(
      (e.target as HTMLInputElement).name === "0"
        ? targetValueReal
        : rangeValue.min.value,
      (e.target as HTMLInputElement).name === "0"
        ? rangeValue.max.value
        : targetValueReal
    );

    onSelect?.(
      {
        ...rangeValue,
        min: { ...rangeValue.min, value: currentMin },
        max: { ...rangeValue.max, value: currentMax },
      },
      name
    );
  };

  const onMoveEnd = (
    e: MouseEvent<HTMLInputElement> | TouchEvent<HTMLInputElement>
  ) => {
    onMoveStop(e);
    e.stopPropagation();
  };

  useEffect(() => {
    if (!isMoving) return;

    const handleTouchEnd = () => {
      setIsMoving(false);
      setIsHighlighted(false);
    };

    document.addEventListener("touchend", handleTouchEnd);
    return () => document.removeEventListener("touchend", handleTouchEnd);
  }, [isMoving]);

  useEffect(() => {
    if (!isMoving) return;

    const handleMouseUp = () => {
      setIsMoving(false);
      setIsHighlighted(false);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [isMoving]);

  const calculateSelectedRangeStyle = () => {
    if (!rangeTrackRef.current) return;

    const innerWidth = rangeTrackRef.current.clientWidth;

    const { min: valueMinReal, max: valueMaxReal } = getMinMax(
      rangeValue.min.value,
      rangeValue.max.value
    );

    const valueMin = mapValueToInputRange(valueMinReal);
    const valueMax = mapValueToInputRange(valueMaxReal);

    const ratioMin = clamp01((valueMin - min) / (maxForInput - min));
    const ratioMax = clamp01((valueMax - min) / (maxForInput - min));

    const leftPx = innerWidth * ratioMin;
    const rightPx = innerWidth * ratioMax;

    setSelectedRangeStyle({
      left: `${leftPx}px`,
      width: `${Math.max(0, rightPx - leftPx)}px`,
    });
  };

  useEffect(() => {
    calculateSelectedRangeStyle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    rangeValue.min.value,
    rangeValue.max.value,
    min,
    max,
    stepValue,
    maxForInput,
  ]);

  useEffect(() => {
    setRangeValuePosition(
      activeInputIndex === 0 ? rangeValue.min.value : rangeValue.max.value
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const track = rangeTrackRef.current;
    if (!track) return;

    let rafId: number | null = null;

    const updateValue = () => {
      calculateSelectedRangeStyle();

      const updatedValue =
        typeof indicatorValue === "number"
          ? indicatorValue
          : activeInputIndex === 0
          ? rangeValue.min.value
          : rangeValue.max.value;

      setRangeValuePosition(updatedValue);
    };

    const updateSchedule = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateValue();
      });
    };

    updateSchedule();

    const observer = new ResizeObserver(updateSchedule);
    observer.observe(track);

    window.addEventListener("resize", updateSchedule);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSchedule);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [
    min,
    max,
    stepValue,
    maxForInput,
    indicatorValue,
    activeInputIndex,
    rangeValue.min.value,
    rangeValue.max.value,
  ]);

  const lowValue = Math.min(rangeValue.min.value, rangeValue.max.value);

  const indicatorIsMin =
    typeof indicatorValue === "number" ? indicatorValue === lowValue : false;

  const indicatorIcon =
    icons?.indicatorMin && icons?.indicatorMax
      ? indicatorIsMin
        ? icons.indicatorMin
        : icons.indicatorMax
      : undefined;

  const indicatorIconKey = indicatorIsMin ? "min" : "max";

  return (
    <div className={containerClasses}>
      {label && (
        <ZRangeLabel label={label} labelClassName={stylesClasses?.label} />
      )}
      <div ref={containerRef} className={styles["z-range"]}>
        <ZRangeInputs
          rangeValue={rangeValueForInput}
          min={min}
          max={maxForInput}
          step={stepValue}
          inputMinClasses={inputMinClasses}
          inputMaxClasses={inputMaxClasses}
          onInputChange={onInputChange}
          onMouseDown={onMoveStart}
          onTouchStart={onMoveStart}
          onMouseMove={onMove}
          onTouchMove={onMove}
          onMouseUp={onMoveEnd}
          onTouchEnd={onMoveEnd}
        />
        <ZRangeTrack
          rangeTrackRef={rangeTrackRef}
          selectedRangeRef={selectedRangeRef}
          selectedRangeStyle={selectedRangeStyle}
          trackStyles={{
            trackContainer: stylesClasses?.trackContainer,
            trackRange: stylesClasses?.trackRange,
            trackSelected: stylesClasses?.trackSelected,
          }}
        />
        <ZRangeIndicator
          valueIndicatorRef={valueIndicatorRef}
          indicatorStyles={{
            indicator: stylesClasses?.indicator,
            indicatorMin: stylesClasses?.indicatorMin,
            indicatorMax: stylesClasses?.indicatorMax,
            indicatorValue: stylesClasses?.indicatorValue,
            indicatorIcon: stylesClasses?.indicatorIcon,
          }}
          indicatorValue={indicatorValue}
          rangeTrackRef={rangeTrackRef}
          inputElement={
            activeInputIndex === 0
              ? rangeValue.min.inputRef.current
              : rangeValue.max.inputRef.current ??
                rangeValue.min.inputRef.current
          }
          scaleFunction={scaleFunction}
          unitList={unitList}
          unitDivisors={unitDivisors}
          scale={scale}
          icon={indicatorIcon}
          iconKey={indicatorIconKey}
          isHighlighted={isHighlighted}
          isIndicatorUnitHidden={isIndicatorUnitHidden}
        />
      </div>
      <div className={styles["z-range__slider-values-wrapper"]}>
        <ZRangeSliderValue
          sliderValueClassName={stylesClasses?.sliderValue}
          value={rangeValue.getValueLabel("min")}
          icon={icons?.thumbMin}
        />
        <ZRangeSliderValue
          sliderValueClassName={stylesClasses?.sliderValue}
          value={rangeValue.getValueLabel("max")}
          icon={icons?.thumbMax}
        />
      </div>
    </div>
  );
};

export default ZRange;
