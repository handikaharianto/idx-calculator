import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type CalculationResultProps = {
  invested: number;
  totalLot: number;
  averagePrice: number;
};

export default function CalculationResult({
  invested,
  totalLot,
  averagePrice,
}: CalculationResultProps) {
  return (
    <div>
      <Separator />
      <div className="py-4">
        <h2 className="text-lg font-semibold">Result</h2>
        <div className="space-y-2 py-4">
          <Separator />
          <div className="flex justify-between">
            <span className="font-medium">Total investasi:</span>{" "}
            <span>Rp {invested.toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="font-medium">Total lot:</span>{" "}
            {totalLot.toLocaleString()}
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="font-medium">Harga rata-rata:</span> Rp{" "}
            {averagePrice.toLocaleString()}
          </div>
          <Separator />
        </div>
      </div>
    </div>
  );
}
