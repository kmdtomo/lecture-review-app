"use client";

import React, { FC, memo } from "react";
import { Rating } from "react-simple-star-rating";
import { Review } from "../type/type";

type Props = {
  rating?: number;
  onClick?: (newRating: number) => void;
  reviews?: Review | Review[];
  size?: number;
};

const averageRating = (reviews: Review | Review[] | undefined): number => {
  if (!reviews) {
    return 0;
  }

  if (Array.isArray(reviews)) {
    // reviews が配列の場合
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => {
      return (
        sum +
        (review.atmosphereRating || 0) +
        (review.futureRating || 0) +
        (review.easinessRating || 0)
      );
    }, 0);

    const average = totalRating / (reviews.length * 3) || 0;

    return roundRating(average); // 0.25刻みで丸める関数を呼び出す
  } else {
    // reviews が単一の Review オブジェクトの場合
    const totalRating =
      (reviews.atmosphereRating || 0) +
      (reviews.futureRating || 0) +
      (reviews.easinessRating || 0);
    const average = totalRating / 3 || 0;
    return roundRating(average); // 0.25刻みで丸める関数を呼び出す
  }
};

// 0.25刻みで丸める関数
const roundRating = (rating: number): number => {
  //Math.roundは小数点以下が 0.5 以上であれば切り上げ、0.5 未満であれば切り捨てる
  return Math.round(rating * 4) / 4; //ratingを４倍にして４で割って切り捨てor切り上げすると2.5刻み
};

const StarsRating: FC<Props> = memo((props) => {
  const { rating, onClick, reviews, size } = props;

  const comprehensiveRating = averageRating(reviews);
  const displayRating = rating ?? comprehensiveRating;

  return (
    <div className="flex items-center">
      <Rating
        emptyStyle={{ display: "flex" }}
        fillStyle={{ display: "-webkit-inline-box" }}
        onClick={onClick}
        initialValue={comprehensiveRating}
        size={size}
        allowFraction
        allowHover={false}
        readonly={!onClick}
        allowTitleTag={false}
        transition
      />
      <span className="align-baseline text-sm ml-2">{displayRating}</span>
    </div>
  );
});

StarsRating.displayName = "StarsRating";

export default StarsRating;
