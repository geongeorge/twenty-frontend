import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { parseFieldRelationType } from '@/object-metadata/utils/parseFieldRelationType';
import { FieldMetadata } from '@/object-record/field/types/FieldMetadata';
import { ColumnDefinition } from '@/object-record/record-table/types/ColumnDefinition';

import { FieldMetadataItem } from '../types/FieldMetadataItem';

import { parseFieldType } from './parseFieldType';

export const formatFieldMetadataItemAsColumnDefinition = ({
  position,
  field,
  objectMetadataItem,
}: {
  position: number;
  field: FieldMetadataItem;
  objectMetadataItem: ObjectMetadataItem;
}): ColumnDefinition<FieldMetadata> => {
  const relationObjectMetadataItem =
    field.toRelationMetadata?.fromObjectMetadata ||
    field.fromRelationMetadata?.toObjectMetadata;

  const relationFieldMetadataId =
    field.toRelationMetadata?.fromFieldMetadataId ||
    field.fromRelationMetadata?.toFieldMetadataId;

  return {
    position,
    fieldMetadataId: field.id,
    label: field.label,
    size: 100,
    type: parseFieldType(field.type),
    metadata: {
      fieldName: field.name,
      placeHolder: field.label,
      relationType: parseFieldRelationType(field),
      relationFieldMetadataId,
      relationObjectMetadataNameSingular:
        relationObjectMetadataItem?.nameSingular ?? '',
      relationObjectMetadataNamePlural:
        relationObjectMetadataItem?.namePlural ?? '',
      objectMetadataNameSingular: objectMetadataItem.nameSingular ?? '',
      options: field.options,
    },
    iconName: field.icon ?? 'Icon123',
    isVisible: true,
  };
};
