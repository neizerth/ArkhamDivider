import { IStory } from "@/types/api";
import { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { propEq } from "ramda";

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

export const hasArkhamesqueStorySupport = ({
  story,
  data
}: {
  story: IStory,
  data: IArkhamesqueBuild
}) =>{
    const id = story.return_to_code || story.code;
    return data.stories.some(
      category => category.data.some(propEq(id, 'code'))
    );
  }