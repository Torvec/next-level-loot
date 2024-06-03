import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { revalidatePath } from "next/cache";
// import { searchResults } from "@/lib/actions";

export default function Search() {
  // const searchResults = async (formData: FormData) => {
  //   "use server"
  //   const slug = (formData.get("game") as string).split(" ").join("-").toLowerCase();
  //   const response = await fetch(
  //     `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${slug}&platforms=18,1,7`,
  //   );
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch games");
  //   }
  //   revalidatePath("/results");
  // }

  return (
    <Dialog>
      <DialogTrigger className="hidden rounded-lg border border-white/20 bg-slate-700/25 px-3 py-1.5 text-sm text-slate-200 md:block">
        Search Games...
      </DialogTrigger>
      <DialogContent className="bg-slate-700">
        <DialogHeader>
          <DialogTitle className="pb-2 text-base text-slate-200">
            Search for games:
          </DialogTitle>
          <form
            // action={searchResults}
            className="flex justify-between rounded-lg border border-white/20 bg-slate-700/25"
          >
            <input
              type="text"
              name="game"
              placeholder="Search"
              className=" w-full bg-slate-700/25 px-3 py-1.5 text-sm text-slate-200"
            />
            <button
              type="submit"
              className="rounded-r-lg bg-yellow-400 px-3 text-blue-700"
            >
              GO
            </button>
            {/* TODO: Replace GO with an icon */}
          </form>
          <DialogDescription className="pt-2 text-xs text-slate-400">
            Powered by RAWG API
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
