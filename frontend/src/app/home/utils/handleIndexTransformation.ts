interface IHandleIndexTransformation {
  index: number;
}

export default function handleIndexTransformation(
  originalIndex: number,
  length: number
): IHandleIndexTransformation {
  const index = length - (originalIndex + 1);

  return ({ index });
}
