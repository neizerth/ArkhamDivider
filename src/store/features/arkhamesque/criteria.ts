import { IArkhamesqueBuild } from "arkhamesque-divider-data";

export const getArkhamesqueClassicStory = ({
  code,
  data
}: {
  data: IArkhamesqueBuild,
  code: string
}) => {
  for (const category of data.stories) {
    for (const story of category.data) {
      if (story.code === code) {
        return {
          category,
          story
        }
      }
    }
  }
}