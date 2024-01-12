import { useEffect } from 'react';

import { useColumnDefinitionsFromFieldMetadata } from '@/object-metadata/hooks/useColumnDefinitionsFromFieldMetadata';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useObjectNameSingularFromPlural } from '@/object-metadata/hooks/useObjectNameSingularFromPlural';
import { useRecordTableContextMenuEntries } from '@/object-record/hooks/useRecordTableContextMenuEntries';
import { useRecordTable } from '@/object-record/record-table/hooks/useRecordTable';
import { filterAvailableTableColumns } from '@/object-record/utils/filterAvailableTableColumns';
import { useViewBar } from '@/views/hooks/useViewBar';
import { ViewType } from '@/views/types/ViewType';

export const RecordTableEffect = ({
  objectNamePlural,
  recordTableId,
  viewBarId,
}: {
  objectNamePlural: string;
  recordTableId: string;
  viewBarId: string;
}) => {
  const {
    setAvailableTableColumns,
    setOnEntityCountChange,
    setObjectMetadataConfig,
    setObjectNamePlural,
  } = useRecordTable({ recordTableId });

  useEffect(() => {
    setObjectNamePlural(objectNamePlural);
  }, [setObjectNamePlural, objectNamePlural]);

  const { objectNameSingular } = useObjectNameSingularFromPlural({
    objectNamePlural,
  });

  const {
    objectMetadataItem,
    basePathToShowPage,
    labelIdentifierFieldMetadata,
  } = useObjectMetadataItem({
    objectNameSingular,
  });

  const { columnDefinitions, filterDefinitions, sortDefinitions } =
    useColumnDefinitionsFromFieldMetadata(objectMetadataItem);

  const {
    setAvailableSortDefinitions,
    setAvailableFilterDefinitions,
    setAvailableFieldDefinitions,
    setViewType,
    setViewObjectMetadataId,
    setEntityCountInCurrentView,
  } = useViewBar({ viewBarId });

  useEffect(() => {
    if (basePathToShowPage && labelIdentifierFieldMetadata) {
      setObjectMetadataConfig?.({
        basePathToShowPage,
        labelIdentifierFieldMetadataId: labelIdentifierFieldMetadata.id,
      });
    }
  }, [
    basePathToShowPage,
    objectMetadataItem,
    labelIdentifierFieldMetadata,
    setObjectMetadataConfig,
  ]);

  useEffect(() => {
    if (!objectMetadataItem) {
      return;
    }
    setViewObjectMetadataId?.(objectMetadataItem.id);
    setViewType?.(ViewType.Table);

    setAvailableSortDefinitions?.(sortDefinitions);
    setAvailableFilterDefinitions?.(filterDefinitions);
    setAvailableFieldDefinitions?.(columnDefinitions);

    const availableTableColumns = columnDefinitions.filter(
      filterAvailableTableColumns,
    );

    setAvailableTableColumns(availableTableColumns);
  }, [
    setViewObjectMetadataId,
    setViewType,
    columnDefinitions,
    setAvailableSortDefinitions,
    setAvailableFilterDefinitions,
    setAvailableFieldDefinitions,
    objectMetadataItem,
    sortDefinitions,
    filterDefinitions,
    setAvailableTableColumns,
  ]);

  const { setActionBarEntries, setContextMenuEntries } =
    useRecordTableContextMenuEntries({
      objectNamePlural,
      recordTableId,
    });

  useEffect(() => {
    setActionBarEntries?.();
    setContextMenuEntries?.();
  }, [setActionBarEntries, setContextMenuEntries]);

  useEffect(() => {
    setOnEntityCountChange(
      () => (entityCount: number) => setEntityCountInCurrentView(entityCount),
    );
  }, [setEntityCountInCurrentView, setOnEntityCountChange]);

  return <></>;
};
