import { SearchQueryBuilder } from "../interfaces/post.interface";
import _ from "lodash";

export const stringifyQueryBuilder = (
  searchQueryBuilder: SearchQueryBuilder
): string => {
  var ordered: SearchQueryBuilder = {};
  _(searchQueryBuilder)
    .keys()
    .sort()
    .each(function (key) {
      (ordered as any)[key] = (searchQueryBuilder as any)[key];
    });
  const sortedCategories = ordered.categories?.sort((a, b) =>
    a.localeCompare(b)
  );
  ordered.categories = sortedCategories;
  return JSON.stringify(ordered);
};
