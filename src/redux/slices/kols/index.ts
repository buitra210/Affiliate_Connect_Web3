import {
  RTKolEngagementAnalysis,
  RTAudienceOverTime,
  RTKolCollaboration,
  RTKolHashTag,
  RTKolInfo,
  RTKolsListItems,
  RTTweetFrequency,
  RTTweetTime,
  RTKOLsTopic,
  RTKOLsPurposes,
  RTKOlsOfferInfo,
  RTKOLsSortBy,
  RTDiscussedTopics,
  RTTopTweets,
} from "@centic-scoring/api/services/affiliate";
import { DataWithStatus } from "../global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getKolCollaboration,
  getKOLEngagementAnalysis,
  getKolHashtag,
  getKolInfo,
  getKOLsList,
  getKOLsAudience,
  getKOLsTweetFrequency,
  getKOLsTweetTime,
  getKOLsWatchList,
  getKOLsTopics,
  getKOLsPurposes,
  getKOLsOfferInfo,
  getKOLRecommendationList,
  getKOLsSortBy,
  getKOLsDiscussedTopics,
  getKOLsTopTweet,
} from "./fetchFunctions";

type SortType = "followers" | "likes" | "replies" | "retweets" | "views" | "bestFit";

export type TKOLsSlice = {
  kols: DataWithStatus<{ numberOfDocs: number; data: RTKolsListItems[] }>;
  // kolsRecommendation: DataWithStatus<{ numberOfDocs: number; data: RTKolsListItems[] }>;
  isRecommendation: boolean;
  kolsWatchList: DataWithStatus<{ numberOfDocs: number; data: RTKolsListItems[] }>;
  topics: DataWithStatus<RTKOLsTopic>;
  purposes: DataWithStatus<RTKOLsPurposes>;
  sortBy: DataWithStatus<RTKOLsSortBy>;
  kolsFilter: {
    status?: string;
    language?: string;
    impressions_max?: number;
    impressions_min?: number;
    retweets_max?: number;
    retweets_min?: number;
    comments_max?: number;
    comments_min?: number;
    likes_max?: number;
    likes_min?: number;
    followers_max?: number;
    followers_min?: number;
    pageSize?: number;
    page?: number;
    keyword?: string;
    topics?: string[];
    purposes?: string[];
    sortType?: SortType;
  };
  kol: {
    info: DataWithStatus<RTKolInfo>;
    // collaboration: DataWithStatus<RTKolCollaboration>;
    collaboration: {
      daily: {
        data: DataWithStatus<RTKolCollaboration>;
        fetchedId: string;
      };
      weekly: {
        data: DataWithStatus<RTKolCollaboration>;
        fetchedId: string;
      };
      monthly: {
        data: DataWithStatus<RTKolCollaboration>;
        fetchedId: string;
      };
    };
    engagement: {
      analysis: {
        daily: {
          data: DataWithStatus<RTKolEngagementAnalysis>;
          fetchedId: string;
        };
        weekly: {
          data: DataWithStatus<RTKolEngagementAnalysis>;
          fetchedId: string;
        };
        monthly: {
          data: DataWithStatus<RTKolEngagementAnalysis>;
          fetchedId: string;
        };
      };
    };
    discussedTopic: DataWithStatus<RTDiscussedTopics>;

    topTweets: {
      daily: {
        data: DataWithStatus<RTTopTweets>;
        fetchedId: string;
      };
      weekly: {
        data: DataWithStatus<RTTopTweets>;
        fetchedId: string;
      };
      monthly: {
        data: DataWithStatus<RTTopTweets>;
        fetchedId: string;
      };
    };
    content: {
      daily: {
        data: DataWithStatus<RTKolHashTag>;
        fetchedId: string;
      };
      weekly: {
        data: DataWithStatus<RTKolHashTag>;
        fetchedId: string;
      };
      monthly: {
        data: DataWithStatus<RTKolHashTag>;
        fetchedId: string;
      };
    };
    audienceOverTime: DataWithStatus<RTAudienceOverTime>;
    tweetFrequency: {
      daily: {
        data: DataWithStatus<RTTweetFrequency>;
        fetchedId: string;
      };
      weekly: {
        data: DataWithStatus<RTTweetFrequency>;
        fetchedId: string;
      };
      monthly: {
        data: DataWithStatus<RTTweetFrequency>;
        fetchedId: string;
      };
    };
    tweetTime: DataWithStatus<RTTweetTime>;
  };
  kolsConnect: {
    kolsOfferInfo: DataWithStatus<RTKOlsOfferInfo>;
  };
};
const initData: TKOLsSlice = {
  kolsFilter: {
    page: 0,
    topics: [],
    keyword: "",
  },
  topics: { status: "IDLE", data: {} },

  kols: { status: "IDLE", data: { numberOfDocs: 0, data: [] } },
  isRecommendation: false,
  // kolsRecommendation: { status: "IDLE", data: { numberOfDocs: 0, data: [] } },
  kolsWatchList: { status: "IDLE", data: { numberOfDocs: 0, data: [] } },
  purposes: { status: "IDLE", data: {} },
  sortBy: { status: "IDLE", data: { numberOfDocs: 0, data: [] } },
  kol: {
    info: { status: "IDLE", data: {} as RTKolInfo },
    collaboration: {
      daily: { data: { status: "IDLE", data: [] }, fetchedId: "" },
      weekly: { data: { status: "IDLE", data: [] }, fetchedId: "" },
      monthly: { data: { status: "IDLE", data: [] }, fetchedId: "" },
    },
    engagement: {
      analysis: {
        daily: { data: { status: "IDLE", data: {} as RTKolEngagementAnalysis }, fetchedId: "" },
        weekly: { data: { status: "IDLE", data: {} as RTKolEngagementAnalysis }, fetchedId: "" },
        monthly: { data: { status: "IDLE", data: {} as RTKolEngagementAnalysis }, fetchedId: "" },
      },
    },
    discussedTopic: {
      status: "IDLE",
      data: {} as RTDiscussedTopics,
    },
    topTweets: {
      daily: {
        data: { status: "IDLE", data: {} as RTTopTweets },
        fetchedId: "",
      },
      weekly: {
        data: { status: "IDLE", data: {} as RTTopTweets },
        fetchedId: "",
      },
      monthly: {
        data: { status: "IDLE", data: {} as RTTopTweets },
        fetchedId: "",
      },
    },
    content: {
      daily: {
        data: { status: "IDLE", data: {} as RTKolHashTag },
        fetchedId: "",
      },
      weekly: {
        data: { status: "IDLE", data: {} as RTKolHashTag },
        fetchedId: "",
      },
      monthly: {
        data: { status: "IDLE", data: {} as RTKolHashTag },
        fetchedId: "",
      },
    },
    audienceOverTime: { status: "IDLE", data: {} as RTAudienceOverTime },
    tweetFrequency: {
      daily: {
        data: { status: "IDLE", data: {} as RTTweetFrequency },
        fetchedId: "",
      },
      weekly: {
        data: { status: "IDLE", data: {} as RTTweetFrequency },
        fetchedId: "",
      },
      monthly: {
        data: { status: "IDLE", data: {} as RTTweetFrequency },
        fetchedId: "",
      },
    },
    tweetTime: { status: "IDLE", data: {} as RTTweetTime },
  },
  kolsConnect: {
    kolsOfferInfo: { status: "IDLE", data: {} as RTKOlsOfferInfo },
  },
};

export const kolsSlice = createSlice({
  name: "KOLs",
  initialState: initData,
  reducers: {
    updateFilter: (state, action: PayloadAction<Partial<TKOLsSlice["kolsFilter"]>>) => {
      state.kolsFilter = { ...state.kolsFilter, ...action.payload };
    },
    setRecommendation: (state, action: PayloadAction<boolean>) => {
      state.isRecommendation = action.payload;
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(getKOLsList.pending, (state) => {
        state.kols.status = "PROCESSING";
      })
      .addCase(getKOLsList.fulfilled, (state, action) => {
        state.kols.status = "SUCCESS";
        state.kols.data = action.payload;
      })
      .addCase(getKOLsList.rejected, (state) => {
        state.kols.status = "FAILED";
      })
      .addCase(getKOLRecommendationList.pending, (state) => {
        state.kols.status = "PROCESSING";
      })
      .addCase(getKOLRecommendationList.fulfilled, (state, action) => {
        state.kols.status = "SUCCESS";
        state.kols.data = action.payload;
      })
      .addCase(getKOLRecommendationList.rejected, (state) => {
        state.kols.status = "FAILED";
      })
      .addCase(getKolInfo.pending, (state) => {
        state.kol.info.status = "PROCESSING";
      })
      .addCase(getKolInfo.fulfilled, (state, action) => {
        state.kol.info.status = "SUCCESS";
        state.kol.info.data = action.payload;
      })
      .addCase(getKolInfo.rejected, (state) => {
        state.kol.info.status = "FAILED";
      })
      .addCase(getKOLsDiscussedTopics.pending, (state) => {
        state.kol.discussedTopic.status = "PROCESSING";
      })
      .addCase(getKOLsDiscussedTopics.fulfilled, (state, action) => {
        state.kol.discussedTopic.status = "SUCCESS";
        state.kol.discussedTopic.data = action.payload;
      })
      .addCase(getKOLsDiscussedTopics.rejected, (state) => {
        state.kol.discussedTopic.status = "FAILED";
      })
      .addCase(getKolCollaboration.pending, (state, action) => {
        const { typeFilter } = action.meta.arg;
        if (typeFilter == "Daily") {
          state.kol.collaboration.daily.data.status = "PROCESSING";
        }
        if (typeFilter == "Weekly") {
          state.kol.collaboration.weekly.data.status = "PROCESSING";
        }
        if (typeFilter == "Monthly") {
          state.kol.collaboration.monthly.data.status = "PROCESSING";
        }
      })
      .addCase(getKolCollaboration.fulfilled, (state, action) => {
        const { typeFilter } = action.meta.arg;
        if (typeFilter == "Daily") {
          state.kol.collaboration.daily.data.status = "SUCCESS";
          state.kol.collaboration.daily.data.data = action.payload;
          state.kol.collaboration.daily.fetchedId = action.meta.arg.userName;
        }
        if (typeFilter == "Weekly") {
          state.kol.collaboration.weekly.data.status = "SUCCESS";
          state.kol.collaboration.weekly.data.data = action.payload;
          state.kol.collaboration.weekly.fetchedId = action.meta.arg.userName;
        }
        if (typeFilter == "Monthly") {
          state.kol.collaboration.monthly.data.status = "SUCCESS";
          state.kol.collaboration.monthly.data.data = action.payload;
          state.kol.collaboration.monthly.fetchedId = action.meta.arg.userName;
        }
      })
      .addCase(getKolCollaboration.rejected, (state, action) => {
        const { typeFilter } = action.meta.arg;
        if (typeFilter == "Daily") {
          state.kol.collaboration.daily.data.status = "FAILED";
        }
        if (typeFilter == "Weekly") {
          state.kol.collaboration.weekly.data.status = "FAILED";
        }
        if (typeFilter == "Monthly") {
          state.kol.collaboration.monthly.data.status = "FAILED";
        }
      })
      .addCase(getKOLEngagementAnalysis.pending, (state, action) => {
        const { type_filter } = action.meta.arg;
        if (type_filter == "Daily") {
          state.kol.engagement.analysis.daily.data.status = "PROCESSING";
        }
        if (type_filter == "Weekly") {
          state.kol.engagement.analysis.weekly.data.status = "PROCESSING";
        }
        if (type_filter == "Monthly") {
          state.kol.engagement.analysis.monthly.data.status = "PROCESSING";
        }
      })
      .addCase(getKOLEngagementAnalysis.fulfilled, (state, action) => {
        const { type_filter } = action.meta.arg;
        if (type_filter == "Daily") {
          state.kol.engagement.analysis.daily.data.status = "SUCCESS";
          state.kol.engagement.analysis.daily.data.data = action.payload;
          state.kol.engagement.analysis.daily.fetchedId = action.meta.arg.userName;
        }
        if (type_filter == "Weekly") {
          state.kol.engagement.analysis.weekly.data.status = "SUCCESS";
          state.kol.engagement.analysis.weekly.data.data = action.payload;
          state.kol.engagement.analysis.weekly.fetchedId = action.meta.arg.userName;
        }
        if (type_filter == "Monthly") {
          state.kol.engagement.analysis.monthly.data.status = "SUCCESS";
          state.kol.engagement.analysis.monthly.data.data = action.payload;
          state.kol.engagement.analysis.monthly.fetchedId = action.meta.arg.userName;
        }
      })
      .addCase(getKOLEngagementAnalysis.rejected, (state, action) => {
        const { type_filter } = action.meta.arg;
        if (type_filter == "Daily") {
          state.kol.engagement.analysis.daily.data.status = "FAILED";
        }
        if (type_filter == "Weekly") {
          state.kol.engagement.analysis.weekly.data.status = "FAILED";
        }
        if (type_filter == "Monthly") {
          state.kol.engagement.analysis.monthly.data.status = "FAILED";
        }
      })
      .addCase(getKOLsTopTweet.pending, (state, action) => {
        const { typeFilter } = action.meta.arg;
        if (typeFilter == "Daily") {
          state.kol.topTweets.daily.data.status = "PROCESSING";
        }
        if (typeFilter == "Weekly") {
          state.kol.topTweets.weekly.data.status = "PROCESSING";
        }
        if (typeFilter == "Monthly") {
          state.kol.topTweets.monthly.data.status = "PROCESSING";
        }
      })
      .addCase(getKOLsTopTweet.fulfilled, (state, action) => {
        const { typeFilter, userName } = action.meta.arg;
        const newData = action.payload.data;
        const totalDocs = action.payload.numberOfDocs;

        const tweetState =
          state.kol.topTweets[typeFilter?.toLowerCase() as "daily" | "weekly" | "monthly"];

        if (tweetState) {
          tweetState.data.status = "SUCCESS";

          if (tweetState.fetchedId !== userName) {
            tweetState.data.data = {
              ...action.payload,
              data: newData,
            };
          } else {
            tweetState.data.data = {
              ...tweetState.data.data,
              data: [...(tweetState.data.data?.data || []), ...newData],
              numberOfDocs: totalDocs,
            };
          }

          tweetState.fetchedId = userName;
        }
      })
      .addCase(getKOLsTopTweet.rejected, (state, action) => {
        const { typeFilter } = action.meta.arg;
        if (typeFilter == "Daily") {
          state.kol.topTweets.daily.data.status = "FAILED";
        }
        if (typeFilter == "Weekly") {
          state.kol.topTweets.weekly.data.status = "FAILED";
        }
        if (typeFilter == "Monthly") {
          state.kol.topTweets.monthly.data.status = "FAILED";
        }
      })
      .addCase(getKolHashtag.pending, (state, action) => {
        const { typeFilter } = action.meta.arg;
        if (typeFilter == "Daily") {
          state.kol.content.daily.data.status = "PROCESSING";
        }
        if (typeFilter == "Weekly") {
          state.kol.content.weekly.data.status = "PROCESSING";
        }
        if (typeFilter == "Monthly") {
          state.kol.content.monthly.data.status = "PROCESSING";
        }
      })
      .addCase(getKolHashtag.fulfilled, (state, action) => {
        const { typeFilter } = action.meta.arg;
        if (typeFilter == "Daily") {
          state.kol.content.daily.data.status = "SUCCESS";
          state.kol.content.daily.data.data = action.payload;
          state.kol.content.daily.fetchedId = action.meta.arg.userName;
        }
        if (typeFilter == "Weekly") {
          state.kol.content.weekly.data.status = "SUCCESS";
          state.kol.content.weekly.data.data = action.payload;
          state.kol.content.weekly.fetchedId = action.meta.arg.userName;
        }
        if (typeFilter == "Monthly") {
          state.kol.content.monthly.data.status = "SUCCESS";
          state.kol.content.monthly.data.data = action.payload;
          state.kol.content.monthly.fetchedId = action.meta.arg.userName;
        }
      })
      .addCase(getKolHashtag.rejected, (state, action) => {
        const { typeFilter } = action.meta.arg;
        if (typeFilter == "Daily") {
          state.kol.content.daily.data.status = "FAILED";
        }
        if (typeFilter == "Weekly") {
          state.kol.content.weekly.data.status = "FAILED";
        }
        if (typeFilter == "Monthly") {
          state.kol.content.monthly.data.status = "FAILED";
        }
      })
      .addCase(getKOLsAudience.pending, (state) => {
        state.kol.audienceOverTime.status = "PROCESSING";
      })
      .addCase(getKOLsAudience.fulfilled, (state, action) => {
        state.kol.audienceOverTime.status = "SUCCESS";
        state.kol.audienceOverTime.data = action.payload;
      })
      .addCase(getKOLsAudience.rejected, (state) => {
        state.kol.audienceOverTime.status = "FAILED";
      })
      .addCase(getKOLsTweetFrequency.pending, (state, action) => {
        const { filterType } = action.meta.arg;
        if (filterType === "Daily") {
          state.kol.tweetFrequency.daily.data.status = "PROCESSING";
        }
        if (filterType === "Weekly") {
          state.kol.tweetFrequency.weekly.data.status = "PROCESSING";
        }
        if (filterType === "Monthly") {
          state.kol.tweetFrequency.monthly.data.status = "PROCESSING";
        }
      })
      .addCase(getKOLsTweetFrequency.fulfilled, (state, action) => {
        const { filterType, userName } = action.meta.arg;
        if (filterType === "Daily") {
          state.kol.tweetFrequency.daily.data.status = "SUCCESS";
          state.kol.tweetFrequency.daily.data.data = action.payload;
          state.kol.tweetFrequency.daily.fetchedId = userName;
        }
        if (filterType === "Weekly") {
          state.kol.tweetFrequency.weekly.data.status = "SUCCESS";
          state.kol.tweetFrequency.weekly.data.data = action.payload;
          state.kol.tweetFrequency.weekly.fetchedId = userName;
        }
        if (filterType === "Monthly") {
          state.kol.tweetFrequency.monthly.data.status = "SUCCESS";
          state.kol.tweetFrequency.monthly.data.data = action.payload;
          state.kol.tweetFrequency.monthly.fetchedId = userName;
        }
      })
      .addCase(getKOLsTweetFrequency.rejected, (state, action) => {
        const { filterType } = action.meta.arg;
        if (filterType === "Daily") {
          state.kol.tweetFrequency.daily.data.status = "FAILED";
        }
        if (filterType === "Weekly") {
          state.kol.tweetFrequency.weekly.data.status = "FAILED";
        }
        if (filterType === "Monthly") {
          state.kol.tweetFrequency.monthly.data.status = "FAILED";
        }
      })
      .addCase(getKOLsTweetTime.pending, (state) => {
        state.kol.tweetTime.status = "PROCESSING";
      })
      .addCase(getKOLsTweetTime.fulfilled, (state, action) => {
        state.kol.tweetTime.status = "SUCCESS";
        state.kol.tweetTime.data = action.payload;
      })
      .addCase(getKOLsTweetTime.rejected, (state) => {
        state.kol.tweetTime.status = "FAILED";
      })
      .addCase(getKOLsWatchList.pending, (state) => {
        state.kolsWatchList.status = "PROCESSING";
      })
      .addCase(getKOLsWatchList.fulfilled, (state, action) => {
        state.kolsWatchList.status = "SUCCESS";
        state.kolsWatchList.data = action.payload;
      })
      .addCase(getKOLsWatchList.rejected, (state) => {
        state.kolsWatchList.status = "FAILED";
      })
      .addCase(getKOLsTopics.pending, (state) => {
        state.topics.status = "PROCESSING";
      })
      .addCase(getKOLsTopics.fulfilled, (state, action) => {
        state.topics.status = "SUCCESS";
        state.topics.data = action.payload;
      })
      .addCase(getKOLsTopics.rejected, (state) => {
        state.topics.status = "FAILED";
      })
      .addCase(getKOLsPurposes.pending, (state) => {
        state.purposes.status = "PROCESSING";
      })
      .addCase(getKOLsPurposes.fulfilled, (state, action) => {
        state.purposes.status = "SUCCESS";
        state.purposes.data = action.payload;
      })
      .addCase(getKOLsPurposes.rejected, (state) => {
        state.purposes.status = "FAILED";
      })
      .addCase(getKOLsOfferInfo.pending, (state) => {
        state.kolsConnect.kolsOfferInfo.status = "PROCESSING";
      })
      .addCase(getKOLsOfferInfo.fulfilled, (state, action) => {
        state.kolsConnect.kolsOfferInfo.status = "SUCCESS";
        state.kolsConnect.kolsOfferInfo.data = action.payload;
      })
      .addCase(getKOLsOfferInfo.rejected, (state) => {
        state.kolsConnect.kolsOfferInfo.status = "FAILED";
      })
      .addCase(getKOLsSortBy.pending, (state) => {
        state.sortBy.status = "PROCESSING";
      })
      .addCase(getKOLsSortBy.fulfilled, (state, action) => {
        state.sortBy.status = "SUCCESS";
        state.sortBy.data = action.payload;
      })
      .addCase(getKOLsSortBy.rejected, (state) => {
        state.sortBy.status = "FAILED";
      });
  },
});
export default kolsSlice.reducer;
export const { updateFilter, setRecommendation } = kolsSlice.actions;
