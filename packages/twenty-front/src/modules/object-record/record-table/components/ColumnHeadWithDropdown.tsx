import styled from '@emotion/styled';

import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';

import { FieldMetadata } from '../../field/types/FieldMetadata';
import { ColumnDefinition } from '../types/ColumnDefinition';

import { ColumnHead } from './ColumnHead';
import { RecordTableColumnDropdownMenu } from './RecordTableColumnDropdownMenu';

type ColumnHeadWithDropdownProps = {
  column: ColumnDefinition<FieldMetadata>;
  isFirstColumn: boolean;
  isLastColumn: boolean;
  primaryColumnKey: string;
};

const StyledDropdown = styled(Dropdown)`
  display: flex;
  flex: 1;
`;

export const ColumnHeadWithDropdown = ({
  column,
  isFirstColumn,
  isLastColumn,
  primaryColumnKey,
}: ColumnHeadWithDropdownProps) => {
  return (
    <StyledDropdown
      dropdownId={column.fieldMetadataId + '-header'}
      clickableComponent={<ColumnHead column={column} />}
      dropdownComponents={
        <RecordTableColumnDropdownMenu
          column={column}
          isFirstColumn={isFirstColumn}
          isLastColumn={isLastColumn}
          primaryColumnKey={primaryColumnKey}
        />
      }
      dropdownOffset={{ x: -1 }}
      dropdownPlacement="bottom-start"
      dropdownHotkeyScope={{ scope: column.fieldMetadataId + '-header' }}
    />
  );
};
