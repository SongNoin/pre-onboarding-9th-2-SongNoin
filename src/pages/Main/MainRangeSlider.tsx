import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  RangeSliderMark,
} from "@chakra-ui/react";

interface MainRangeSliderProps {
  onChange: (value: React.SetStateAction<number[]>) => void;
  onChangeEnd: (value: React.SetStateAction<boolean>) => void;
  value: number[];
}

export const MainRangeSlider = ({
  onChange,
  onChangeEnd,
  value,
}: MainRangeSliderProps) => {
  return (
    <>
      <RangeSlider
        aria-label={["min", "max"]}
        defaultValue={[0, 30000]}
        min={0}
        max={30000}
        w={300}
        onChange={(priceValue) => onChange(priceValue)}
        onChangeEnd={() => onChangeEnd((prev) => !prev)}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
          0
        </RangeSliderMark>
        <RangeSliderMark value={10000} mt="1" ml="-2.5" fontSize="sm">
          10,000
        </RangeSliderMark>
        <RangeSliderMark value={20000} mt="1" ml="-2.5" fontSize="sm">
          20,000
        </RangeSliderMark>
        <RangeSliderMark value={30000} mt="1" fontSize="sm">
          30,000
        </RangeSliderMark>
        <RangeSliderMark
          value={value[0]}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="20"
          borderRadius={5}
        >
          {value[0].toLocaleString("kr")}원
        </RangeSliderMark>
        <RangeSliderMark
          value={value[1]}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="20"
          borderRadius={5}
        >
          {value[1].toLocaleString("kr")}원
        </RangeSliderMark>
        <RangeSliderThumb index={0} border={"1px solid gray"} />
        <RangeSliderThumb index={1} border={"1px solid gray"} />
      </RangeSlider>
    </>
  );
};
