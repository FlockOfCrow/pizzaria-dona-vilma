import PizzaLoading from "@/components/loading/pizza-loading";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[url(/background2.png)] bg-repeat bg-center flex items-center justify-center">
      <PizzaLoading />
    </div>
  );
}
