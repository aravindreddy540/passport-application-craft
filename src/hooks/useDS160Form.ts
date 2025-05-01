
import { useFormContext } from '../context/FormContext';

// A custom hook that provides form context functionality with better TypeScript support
export const useDS160Form = () => {
  return useFormContext();
};
