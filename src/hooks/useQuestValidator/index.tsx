import { TasksParams } from "@centic-scoring/api/services/airdrop-services";
import { QuestType } from "@centic-scoring/module/Quests/components/QuestItem/config";
import { useAirdropSelector, useAppDispatch } from "@centic-scoring/redux/hook";
import { QuestStorage } from "@centic-scoring/utils/storage/questsStorage";
import { isEqual } from "lodash";
import { sleep } from "../useScoreDistribution";
import { useCallback } from "react";
import { refreshTasks } from "@centic-scoring/redux/slices/airdrop";
import { toast } from "react-toastify";

export default function useQuestValidator() {
  const { tasks } = useAirdropSelector();
  const dispatch = useAppDispatch();
  //receive quest type and quest param of done action, validate quest status in redux

  const validateDailyQuest = useCallback(
    async (type: QuestType, params: TasksParams, delay?: number) => {
      if (delay) {
        await sleep(delay);
      }
      const taskProgress = QuestStorage.getStorage();
      [...(tasks.data?.["Daily Tasks"] || []), ...(tasks.data?.["Social Tasks"] || [])]
        ?.filter((task) => {
          return task.type === type;
        })
        .forEach((matchedType) => {
          if (!taskProgress.quests[matchedType._id]?.done) {
            if (Object.keys(matchedType.params || {}).length === 0) {
              //update done quest
              toast.success("🚀 Task done: " + matchedType.name);
              QuestStorage.editTQuestStorage(matchedType._id, {
                done: true,
              });
              dispatch(refreshTasks());
            } else {
              // compare param
              if (isEqual(matchedType.params, params)) {
                //update done quest
                toast.success("🚀 Task done: " + matchedType.name);
                QuestStorage.editTQuestStorage(matchedType._id, {
                  done: true,
                });
                dispatch(refreshTasks());
              }
            }
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return { validateDailyQuest };
}
