import { useRecoilValue, useSetRecoilState } from 'recoil';

import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useObjectNameSingularFromPlural } from '@/object-metadata/hooks/useObjectNameSingularFromPlural';
import { turnSortsIntoOrderBy } from '@/object-record/object-sort-dropdown/utils/turnSortsIntoOrderBy';
import { turnObjectDropdownFilterIntoQueryFilter } from '@/object-record/record-filter/utils/turnObjectDropdownFilterIntoQueryFilter';
import { useRecordTableStates } from '@/object-record/record-table/hooks/internal/useRecordTableStates';
import { useRecordTable } from '@/object-record/record-table/hooks/useRecordTable';
import { signInBackgroundMockCompanies } from '@/sign-in-background-mock/constants/signInBackgroundMockCompanies';

import { useFindManyRecords } from './useFindManyRecords';

export const useObjectRecordTable = () => {
  const {
    objectNamePlural,
    setRecordTableData,
    setIsRecordTableInitialLoading,
  } = useRecordTable();
  const currentWorkspace = useRecoilValue(currentWorkspaceState);

  const { objectNameSingular } = useObjectNameSingularFromPlural({
    objectNamePlural,
  });

  const { objectMetadataItem: foundObjectMetadataItem } = useObjectMetadataItem(
    {
      objectNameSingular,
    },
  );

  const { tableFiltersState, tableSortsState, tableLastRowVisibleState } =
    useRecordTableStates();

  const tableFilters = useRecoilValue(tableFiltersState());
  const tableSorts = useRecoilValue(tableSortsState());
  const setLastRowVisible = useSetRecoilState(tableLastRowVisibleState());

  const requestFilters = turnObjectDropdownFilterIntoQueryFilter(
    tableFilters,
    foundObjectMetadataItem?.fields ?? [],
  );

  const orderBy = turnSortsIntoOrderBy(
    tableSorts,
    foundObjectMetadataItem?.fields ?? [],
  );

  const { records, loading, fetchMoreRecords, queryStateIdentifier } =
    useFindManyRecords({
      objectNameSingular,
      filter: requestFilters,
      orderBy,
      onCompleted: () => {
        setLastRowVisible(false);
        setIsRecordTableInitialLoading(false);
      },
    });

  return {
    records: currentWorkspace ? records : signInBackgroundMockCompanies,
    loading,
    fetchMoreRecords,
    queryStateIdentifier,
    setRecordTableData,
  };
};
