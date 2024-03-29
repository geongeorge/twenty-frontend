import { useSaveFieldEditModeValue } from '@/object-record/field/hooks/useSaveFieldEditModeValue';
import { TextInput } from '@/ui/field/input/components/TextInput';

import { FieldInputOverlay } from '../../../../../ui/field/input/components/FieldInputOverlay';
import { usePersistField } from '../../../hooks/usePersistField';
import { useTextField } from '../../hooks/useTextField';

import { FieldInputEvent } from './DateFieldInput';

export type TextFieldInputProps = {
  onClickOutside?: FieldInputEvent;
  onEnter?: FieldInputEvent;
  onEscape?: FieldInputEvent;
  onTab?: FieldInputEvent;
  onShiftTab?: FieldInputEvent;
};

export const TextFieldInput = ({
  onEnter,
  onEscape,
  onClickOutside,
  onTab,
  onShiftTab,
}: TextFieldInputProps) => {
  const { fieldDefinition, initialValue, hotkeyScope } = useTextField();

  const persistField = usePersistField();
  const saveEditModeValue = useSaveFieldEditModeValue();

  const handleEnter = (newText: string) => {
    onEnter?.(() => persistField(newText));
  };

  const handleEscape = (newText: string) => {
    onEscape?.(() => persistField(newText));
  };

  const handleClickOutside = (
    event: MouseEvent | TouchEvent,
    newText: string,
  ) => {
    onClickOutside?.(() => persistField(newText));
  };

  const handleTab = (newText: string) => {
    onTab?.(() => persistField(newText));
  };

  const handleShiftTab = (newText: string) => {
    onShiftTab?.(() => persistField(newText));
  };

  const handleChange = (newText: string) => {
    saveEditModeValue(newText);
  };

  return (
    <FieldInputOverlay>
      <TextInput
        placeholder={fieldDefinition.metadata.placeHolder}
        autoFocus
        value={initialValue}
        onClickOutside={handleClickOutside}
        onEnter={handleEnter}
        onEscape={handleEscape}
        onShiftTab={handleShiftTab}
        onTab={handleTab}
        hotkeyScope={hotkeyScope}
        onChange={handleChange}
      />
    </FieldInputOverlay>
  );
};
