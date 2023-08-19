import MealItem from "./MealItem/MealItem";
import classes from "./MealsAvailable.module.css";
import Card from "../UI/Card";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";
import loadingGif from "../../Assets/loadingGif.gif";

function MealsAvailable() {
  const { isLoading, error, sendRequest } = useHttp();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    let loadedMeals = [];
    sendRequest(
      {
        url: "https://reactmeals-cf87c-default-rtdb.firebaseio.com/Meals.json",
      },
      (mealkeys) => {
        for (const key in mealkeys) {
          loadedMeals.push({
            id: key,
            price: mealkeys[key].price,
            description: mealkeys[key].description,
            name: mealkeys[key].name,
          });
        }
        setMeals(loadedMeals);
      }
    );
  }, [sendRequest]);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        price={meal.price}
        description={meal.description}
        name={meal.name}
      />
    );
  });

  let content = <ul>{mealsList}</ul>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = (
      <img src={loadingGif} width={120} height={120} alt="loading gif" />
    );
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
}

export default MealsAvailable;
