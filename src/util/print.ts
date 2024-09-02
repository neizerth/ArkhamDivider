export const getGroupSize = <T>(group: T[][]) => group.reduce((total, group) => total + group.length, 0);

export const canFitDoubleSide = <T>(group: T[][], groupSize: number) => {
  const size = getGroupSize(group);
  const halfSize = Math.floor(groupSize / 2);

  return size <= halfSize;
};

export const createDoubleSidedGroups = <T>(groups: T[][][], groupSize: number) => groups.reduce((target, group, index) => {
  const isLastGroup = index === groups.length - 1;

  if (isLastGroup && canFitDoubleSide(group, groupSize)) {
    const doubleSideGroup = group.reduce((target, row) => {
      return [
        ...target,
        ...row.map(item => ([item, item]))
      ];
    }, [] as T[][]);

    return [
      ...target,
      doubleSideGroup
    ]
  }

  return [
    ...target,
    group,
    group.map(row => row.reverse())
  ];
}, [] as T[][][]);