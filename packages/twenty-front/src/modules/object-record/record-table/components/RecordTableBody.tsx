import { useRecoilValue } from 'recoil';

import { RecordTableBodyFetchMoreLoader } from '@/object-record/record-table/components/RecordTableBodyFetchMoreLoader';
import { RecordTableRow } from '@/object-record/record-table/components/RecordTableRow';
import { RowIdContext } from '@/object-record/record-table/contexts/RowIdContext';
import { RowIndexContext } from '@/object-record/record-table/contexts/RowIndexContext';
import { useRecordTableStates } from '@/object-record/record-table/hooks/internal/useRecordTableStates';

export const RecordTableBody = () => {
  const { tableRowIdsState } = useRecordTableStates();

  const tableRowIds = useRecoilValue(tableRowIdsState());

  return (
    <>
      <tbody>
        {tableRowIds.map((rowId, rowIndex) => (
          <RowIdContext.Provider value={rowId} key={rowId}>
            <RowIndexContext.Provider value={rowIndex}>
              <RecordTableRow key={rowId} rowId={rowId} />
            </RowIndexContext.Provider>
          </RowIdContext.Provider>
        ))}
      </tbody>
      <RecordTableBodyFetchMoreLoader />
    </>
  );
};
