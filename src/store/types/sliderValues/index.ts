export type SliderValues = {
  MIN_SLIDER: number;
  MAX_SLIDER: number;
  MAX_SLIDER_INPUT: number;
  MARKS: SliderMarks[];
}

type SliderMarks = {
  value: number;
  label: string;
}