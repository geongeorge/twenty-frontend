import { BoardOptionsDropdownId } from '@/object-record/record-board/constants/BoardOptionsDropdownId';
import { StyledHeaderDropdownButton } from '@/ui/layout/dropdown/components/StyledHeaderDropdownButton';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';

export const RecordBoardOptionsDropdownButton = () => {
  const { isDropdownOpen, toggleDropdown } = useDropdown(
    BoardOptionsDropdownId,
  );

  const handleClick = () => {
    toggleDropdown();
  };

  return (
    <StyledHeaderDropdownButton
      isUnfolded={isDropdownOpen}
      onClick={handleClick}
    >
      Options
    </StyledHeaderDropdownButton>
  );
};
