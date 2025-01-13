import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CalculationForm from "@/components/calculation/form";

export default function Home() {
  return (
    <main>
      <div className="mx-auto my-8 max-w-3xl">
        <Card className="border-none p-0 shadow-none">
          <CardHeader className="px-0">
            <CardTitle>IDX Average Calculator</CardTitle>
            <CardDescription>
              Hitung harga rata-rata saham dengan mudah dan akurat.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <CalculationForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
