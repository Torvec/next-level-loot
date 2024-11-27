import {
  FreeGameType,
  BestDealsType,
  HighestRatedGameType,
  Category,
} from "../../../lib/types";
import ResultsList from "@/components/ui/results-list";
import BestDealsCard from "../../../components/best-deals/best-deals-card";
import BestDealsForm from "../../../components/best-deals/best-deals-form";
import FreeGamesCard from "../../../components/free-games/free-games-card";
import FreeGamesForm from "../../../components/free-games/free-games-form";
import HighestRatedGamesCard from "../../../components/highest-rated/highest-rated-games-card";
import HighestRatedGamesForm from "../../../components/highest-rated/highest-rated-games-form";
import { fetchList } from "@/lib/fetch";

export default async function Page(props: {
  params: Promise<{ category: Category }>;
}) {
  const { category } = await props.params;

  //! If i want to fetch different data for each category, this might need to be in a state variable
  const data = await fetchList(category);

  const categoryComponents = {
    "best-deals": {
      form: <BestDealsForm />,
      card: (data: BestDealsType[]) => {
        return data.map((deal) => (
          <BestDealsCard key={deal.dealID} {...deal} />
        ));
      },
    },
    "free-games": {
      form: <FreeGamesForm />,
      card: (data: FreeGameType[]) => {
        return data.map((game) => <FreeGamesCard key={game.id} {...game} />);
      },
    },
    "highest-rated": {
      form: <HighestRatedGamesForm />,
      card: (data: { results: HighestRatedGameType[] }) => {
        return data.results.map((game) => (
          <HighestRatedGamesCard key={game.id} {...game} />
        ));
      },
    },
  };

  const formOptions = categoryComponents[category].form;
  const content = categoryComponents[category].card(data);

  return (
    <div className="my-16 space-y-16">
      {formOptions}
      <ResultsList>{content}</ResultsList>
    </div>
  );
}
