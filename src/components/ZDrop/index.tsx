import {
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ZDropProps,
  ZDropOption,
  ZDropSingleValue,
  ZDropMultipleValue,
  InputOptionRemove,
} from "./types/zDropTypes";
import { classNames } from "../../helpers/classNames";
import { useOutsideClose } from "../../hooks/useOutsideClose";
import styles from "./styles/ZDrop.module.scss";
import ZDropLabel from "./components/ZDropLabel";
import { ZDropList } from "./components/ZDropList";
import ZDropListVisibilityToggle from "./components/ZDropListVisibilityToggle";
import ZDropClearButton from "./components/ZDropClearButton";
import ZDropInput from "./components/ZDropInput";
import { checkIsValueEqualToOption } from "./helpers/checkIsValueEqualToOption";
import { findOption } from "./helpers/findOption";
import { defaultSearchFilter } from "./helpers/searchFilter";
import { getCurrentMultipleValue } from "./helpers/getCurrentMultipleValue";
import ZDropListWrapper from "./components/ZDropList/ZDropListWrapper";
import { checkIsValueEqualToSelectedValue } from "./helpers/checkIsValueEqualToSelectedValue";

const ZDrop = (props: ZDropProps) => {
  const {
    name,
    options,
    value,
    valueKey = "value",
    label,
    labelKey = "label",
    placeholder,
    isMultiple = false,
    isDisabled = false,
    isSearchable = false,
    clear = "none",
    searchFilterDelay,
    searchFilter = defaultSearchFilter,
    shouldReturnObjectOnChange = false,
    onChange,
    onBlur,
    onClear,
    valueRenderer,
    optionRenderer,
    expandToggleRenderer,
    clearIcon,
    noDataContent,
    referenceElementClassName,
    positionToReferenceElement,
    listMaxHeightLimiter,
    styleClasses,
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRefSingleValueRenderer = useRef<HTMLInputElement | null>(null);
  const inputRefMultipleValueRenderer = useRef<HTMLInputElement | null>(null);
  const optionsRef = useRef<(HTMLLIElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isValueCorrect = value !== undefined && value !== null && value !== "";
  const isClearable = ["always", "whenChanged", "whenSearched"].includes(clear);
  const isClearableOnlyWhenChange = clear === "whenChanged";
  const isClearableOnlyWhenSearch = clear === "whenSearched";

  const [optionsData, setOptionsData] = useState<ZDropOption[]>([]);
  const [selectedValue, setSelectedValue] = useState<
    ZDropSingleValue | ZDropMultipleValue
  >(isMultiple ? [] : "");
  const [isListVisible, setIsListVisible] = useState<boolean>(false);
  const [isInputItemVisible, setIsInputItemVisible] =
    useState<boolean>(isValueCorrect);
  const [currentSearchedValue, setCurrentSearchedValue] = useState<string>("");
  const [hasValueChanged, setHasValueChanged] = useState<boolean>(false);

  const isSelectedValueCorrect =
    selectedValue !== undefined &&
    selectedValue !== null &&
    selectedValue !== "";

  const containerClasses = classNames(
    styles.container,
    styleClasses?.container
  );
  const inputFieldClasses = classNames(
    styles.inputField,
    styleClasses?.inputField,
    {
      [styles["inputField--multiple"]]: isMultiple,
      [styles["inputField--disabled"]]: isDisabled,
    }
  );

  const updateOptionsDataBySearch = (
    options: ZDropOption[],
    currentValue: string,
    labelKey: string
  ) => {
    const searchResult = searchFilter({
      options,
      currentValue,
      labelKey,
    });

    setOptionsData(searchResult ? searchResult : options);
  };

  const setCurrentValue = (selected: ZDropOption | ZDropOption[]): void => {
    if (isMultiple) {
      const currentMultipleSelected = getCurrentMultipleValue(
        selected,
        selectedValue,
        options || [],
        valueKey
      );

      setSelectedValue(currentMultipleSelected);
      onChange?.(currentMultipleSelected);

      return;
    }

    setCurrentSearchedValue("");
    setIsListVisible(false);
    setOptionsData(options || []);

    setSelectedValue(selected);

    if (shouldReturnObjectOnChange && typeof selected === "object") {
      onChange?.(selected);

      return;
    }

    onChange?.(
      (typeof selected === "object" && (selected as any)?.[valueKey]) ||
        selected
    );
  };

  const defaultInputValue = useCallback(
    (defaultValue: ZDropSingleValue | ZDropMultipleValue) => {
      if (isMultiple && Array.isArray(defaultValue)) {
        const multipleValues = options?.filter((option) =>
          defaultValue.some((valueItem) =>
            checkIsValueEqualToOption(valueItem, option, valueKey)
          )
        );

        return multipleValues || [];
      }

      return findOption(options, defaultValue, valueKey) ?? "";
    },
    [isMultiple, options, value, selectedValue, valueKey]
  );

  const onExpandToggleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDisabled) {
      return;
    }

    setIsListVisible((prev) => !prev);

    if (!isMultiple && isSelectedValueCorrect && valueRenderer) {
      setIsInputItemVisible((prev) => !prev);
    }
  };

  const onInputFieldClick: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if ((e.target as HTMLElement).tagName === "INPUT") {
      return;
    }

    if (isDisabled) {
      return;
    }

    if (isListVisible) {
      setIsListVisible(false);
    }

    if (
      isListVisible &&
      !isMultiple &&
      valueRenderer &&
      isSelectedValueCorrect
    ) {
      setIsInputItemVisible(true);
    }
  };

  const onInputClick: MouseEventHandler = (e) => {
    e.preventDefault();

    if (!isListVisible) {
      setIsListVisible(true);
    }

    if (!isListVisible && !isMultiple && valueRenderer) {
      setIsInputItemVisible(false);
    }

    if (!isListVisible && isSearchable && isSelectedValueCorrect) {
      updateOptionsDataBySearch(options || [], currentSearchedValue, labelKey);
    }
  };

  const onInputChange: (e: ChangeEvent<HTMLInputElement>) => void = useCallback(
    (e) => {
      const currentValue: string = e.target.value;

      if (isSearchable) {
        setCurrentSearchedValue(currentValue);
      }

      const inputSelectChange = (currentValue: string) => {
        if (!isListVisible) {
          setIsListVisible(true);
        }

        if (isSearchable) {
          updateOptionsDataBySearch(options || [], currentValue, labelKey);
        }
      };

      if (searchFilterDelay && searchFilterDelay > 0) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(
          () => inputSelectChange(currentValue),
          searchFilterDelay
        );
      } else {
        inputSelectChange(currentValue);
      }
    },
    [
      selectedValue,
      isMultiple,
      isSearchable,
      isListVisible,
      labelKey,
      options,
      searchFilter,
      searchFilterDelay,
    ]
  );

  const onInputKeyDown: KeyboardEventHandler = (e) => {
    if (!isListVisible && ["Enter", " "].includes(e.key)) {
      if (e.currentTarget !== e.target) {
        return;
      }

      e.preventDefault();

      setIsListVisible((prev) => !prev);
    }

    if (e.key === "ArrowDown" && isListVisible) {
      e.preventDefault();

      optionsRef.current[0]?.focus();
    }

    if (!isListVisible && isSearchable && !isMultiple && valueRenderer) {
      setIsInputItemVisible(false);
    }
  };

  const applyInputSelectFocus = useCallback(() => {
    if (isMultiple) {
      inputRefMultipleValueRenderer.current?.focus();

      return;
    }

    if (valueRenderer) {
      inputRefSingleValueRenderer.current?.focus();

      return;
    }

    inputRef.current?.focus();
  }, [isMultiple, valueRenderer]);

  const onInputItemClick: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsInputItemVisible(false);
    setIsListVisible(true);
  };

  const onInputOptionRemove: InputOptionRemove = (e, option) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();

    if (!isMultiple) {
      setSelectedValue("");
      onChange?.("");
    } else {
      const selectedOptions = [
        ...(selectedValue as ZDropMultipleValue).filter(
          (value) => value !== (option as any)?.[valueKey] && value !== option
        ),
      ];

      setSelectedValue(selectedOptions);
      onChange?.(selectedOptions);
    }

    if (!isListVisible) {
      setIsListVisible(true);
    }

    if (isInputItemVisible) {
      setIsInputItemVisible(false);
    }
  };

  const onInputClear: MouseEventHandler = (e) => {
    if (isSearchable && options) {
      setCurrentSearchedValue("");
      setOptionsData(options);

      applyInputSelectFocus();
    }

    if (valueRenderer) {
      (clear === "always" || clear === "whenChanged") &&
        setIsInputItemVisible(false);
    }

    if (!isListVisible) {
      setIsListVisible(true);
    }

    if (isClearable && !isClearableOnlyWhenSearch) {
      setSelectedValue(isMultiple ? [] : "");
      setHasValueChanged(false);

      onChange?.(isMultiple ? [] : undefined);
    }

    onClear?.();
  };

  const onOptionClick: (
    e: MouseEvent<HTMLLIElement>,
    option: { [key: string]: any }
  ) => void = (e, option) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();

    if ((e?.target as Element)?.closest("div")?.dataset?.separator) {
      return;
    }

    setCurrentValue(option);
    setIsListVisible(false);

    if (isClearable && !isClearableOnlyWhenSearch) {
      setHasValueChanged(true);
    }

    if (valueRenderer) {
      setIsInputItemVisible(true);
    }
  };

  const onOptionKeyDown: (
    e: KeyboardEvent<HTMLLIElement>,
    option: { [key: string]: any },
    index: number
  ) => void = (e, option, index) => {
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault();

      if (
        ((e.target as HTMLElement).children[0] as HTMLElement)?.dataset
          ?.separator
      ) {
        return;
      }

      setCurrentValue(option);

      if (isClearable && !isClearableOnlyWhenSearch) {
        setHasValueChanged(true);
      }

      if (valueRenderer) {
        setIsInputItemVisible(true);
      }
    }

    if (e.key === "ArrowUp" && index > 0) {
      e.preventDefault();

      optionsRef.current[index - 1]?.focus();
    }

    if (e.key === "ArrowDown" && index < optionsData.length - 1) {
      e.preventDefault();

      optionsRef.current[index + 1]?.focus();
    }

    if (e.key === "ArrowUp" && index === 0) {
      e.preventDefault();
      applyInputSelectFocus();
    }

    if (e.key === "Backspace") {
      onInputOptionRemove(e, option);
    }
  };

  useOutsideClose(
    containerRef,
    () => {
      setIsListVisible(false);

      if (isSearchable && !currentSearchedValue) {
        setOptionsData(options || []);
      }

      if (valueRenderer && isSelectedValueCorrect) {
        setIsInputItemVisible(true);
      }
    },
    {
      isActive: isListVisible,
    }
  );

  useEffect(() => {
    if (options) {
      setOptionsData(options);
    }
  }, [options]);

  useEffect(() => {
    if (optionsData) {
      optionsRef.current = optionsRef.current.slice(0, optionsData?.length);
    }
  }, [optionsData]);

  useEffect(() => {
    if (
      isValueCorrect &&
      !checkIsValueEqualToSelectedValue(value, selectedValue)
    ) {
      setCurrentValue(defaultInputValue(value));
      valueRenderer && setIsInputItemVisible(true);
    }
  }, []);

  useEffect(() => {
    if (isListVisible && isSearchable) {
      applyInputSelectFocus();
    }
  }, [applyInputSelectFocus, isSearchable, isListVisible]);

  const zDropList = (
    <ZDropList
      options={optionsData}
      selectedValue={selectedValue}
      valueKey={valueKey}
      labelKey={labelKey}
      optionsRef={optionsRef}
      optionRenderer={optionRenderer}
      onOptionClick={onOptionClick}
      onOptionKeyDown={onOptionKeyDown}
      noDataContent={noDataContent}
      currentSearchedValue={currentSearchedValue}
      listStyleClasses={{
        list: styleClasses?.list,
        listItem: styleClasses?.listItem,
        noData: styleClasses?.noData,
      }}
      isListWrapperEnabled={!!referenceElementClassName}
    />
  );

  return (
    <div ref={containerRef} className={containerClasses} onBlur={onBlur}>
      {label && (
        <ZDropLabel name={name} label={label} className={styleClasses?.label} />
      )}
      <div className={inputFieldClasses} onClick={onInputFieldClick}>
        <ZDropInput
          name={name}
          options={options || []}
          selectedValue={selectedValue}
          {...(isSearchable && {
            currentSearchedValue: currentSearchedValue,
            setCurrentSearchedValue: setCurrentSearchedValue,
          })}
          valueKey={valueKey}
          labelKey={labelKey}
          placeholder={placeholder}
          isMultiple={isMultiple}
          isDisabled={isDisabled}
          isSearchable={isSearchable}
          isListVisible={isListVisible}
          setIsListVisible={setIsListVisible}
          isInputItemVisible={isInputItemVisible}
          valueRenderer={valueRenderer}
          onInputClick={onInputClick}
          onInputItemClick={onInputItemClick}
          onInputKeyDown={onInputKeyDown}
          onInputChange={onInputChange}
          onInputOptionRemove={onInputOptionRemove}
          inputRef={inputRef}
          inputRefMultipleValueRenderer={inputRefMultipleValueRenderer}
          inputRefSingleValueRenderer={inputRefSingleValueRenderer}
          inputStyleClasses={{
            input: styleClasses?.input,
            inputValue: styleClasses?.inputValue,
            inputMultipleValue: styleClasses?.inputMultipleValue,
            inputMultipleSearch: styleClasses?.inputMultipleSearch,
          }}
        />
        {isClearable && (
          <ZDropClearButton
            hasValueChanged={hasValueChanged}
            currentSearchedValue={currentSearchedValue}
            onInputClear={onInputClear}
            isListVisible={isListVisible}
            isClearableOnlyWhenChange={isClearableOnlyWhenChange}
            isClearableOnlyWhenSearch={isClearableOnlyWhenSearch}
            className={styleClasses?.clearButton}
            clearIcon={clearIcon}
          />
        )}
        <ZDropListVisibilityToggle
          expandToggleRenderer={expandToggleRenderer}
          isListVisible={isListVisible}
          onClick={onExpandToggleClick}
          toggleStyleClasses={{
            expandToggle: styleClasses?.expandToggle,
            expandToggleIcon: styleClasses?.expandToggleIcon,
          }}
        />
      </div>
      {isListVisible && !referenceElementClassName && zDropList}
      {isListVisible && referenceElementClassName && (
        <ZDropListWrapper
          referenceElementClassName={referenceElementClassName}
          positionToReferenceElement={positionToReferenceElement}
          listMaxHeightLimiter={listMaxHeightLimiter}
        >
          {zDropList}
        </ZDropListWrapper>
      )}
    </div>
  );
};

export default ZDrop;
