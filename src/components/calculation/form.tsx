"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash, X } from "lucide-react";
import { useState } from "react";
import CalculationResult from "@/components/calculation/result";

const formSchema = z.object({
  calculation: z.array(
    z.object({
      buyPrice: z.string().trim(),
      numOfShares: z.string().trim(),
      buyFee: z.string().trim(),
    }),
  ),
});

export default function CalculationForm() {
  const [result, setResult] = useState<{
    invested: number;
    totalLot: number;
    averagePrice: number;
  }>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calculation: [
        {
          buyPrice: "",
          numOfShares: "",
          buyFee: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "calculation",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    let totalShares = 0;

    const totalInvested = values.calculation.reduce((acc, cur) => {
      const buyPrice = Number(cur.buyPrice);
      const numOfShares = Number(cur.numOfShares) * 100;
      const buyFee = (buyPrice * numOfShares * Number(cur.buyFee)) / 100;

      totalShares += numOfShares;
      console.log(buyPrice * numOfShares + buyFee);

      return acc + (buyPrice * numOfShares + buyFee);
    }, 0);
    console.log(`totalInvested: ${totalInvested}`);
    const averagePrice = (totalInvested / totalShares).toFixed(2);

    setResult({
      invested: totalInvested,
      totalLot: totalShares / 100,
      averagePrice: Number(averagePrice),
    });
    console.log(`averagePrice: ${averagePrice}`);
  };

  const handleInputChange = (
    value: string,
    regex: RegExp,
    onChange: (...event: any[]) => void,
  ) => {
    if (value === "" || regex.test(value)) {
      onChange(value);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-end gap-x-3">
              <FormField
                control={form.control}
                name={`calculation.${index}.buyPrice`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga beli (Rp)</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="1000"
                        autoComplete="off"
                        {...field}
                        onChange={(e) =>
                          handleInputChange(
                            e.target.value,
                            /^[0-9\b]+$/,
                            field.onChange,
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="py-[12px]">
                <X size={16} />
              </div>
              <FormField
                control={form.control}
                name={`calculation.${index}.numOfShares`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah saham (Lot)</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="500"
                        autoComplete="off"
                        {...field}
                        onChange={(e) =>
                          handleInputChange(
                            e.target.value,
                            /^[0-9\b]+$/,
                            field.onChange,
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="py-[12px]">
                <Plus size={16} />
              </div>
              <FormField
                control={form.control}
                name={`calculation.${index}.buyFee`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biaya pembelian (%)</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="0.15"
                        autoComplete="off"
                        {...field}
                        onChange={(e) =>
                          handleInputChange(
                            e.target.value,
                            /^\d*\.?\d*$/,
                            field.onChange,
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {index !== 0 && (
                <Button
                  variant="ghost"
                  onClick={() => remove(index)}
                  onKeyDown={(e) => e.preventDefault()}
                >
                  <Trash size={12} color="red" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="link"
            onClick={() =>
              append({ buyPrice: "", numOfShares: "", buyFee: "" })
            }
            className="gap-x-1 p-0 text-xs"
          >
            <Plus size={12} /> <span>Tambahkan pembelian baru</span>
          </Button>
        </div>
        <Button type="submit">Hitung</Button>
        {result && <CalculationResult {...result} />}
      </form>
    </Form>
  );
}
