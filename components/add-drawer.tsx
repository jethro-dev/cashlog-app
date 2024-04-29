import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { fetchAllExpenseType } from "@/lib/supabase/utils";
import { Tables } from "@/types/supabase";
import { createExpense } from "@/actions/create-expense";

type Props = {};

export const AddDrawer = async (props: Props) => {
  const eTypes: Tables<"expense_types">[] = await fetchAllExpenseType();

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex flex-col items-center justify-center">
          <CirclePlus className="h-6 w-6" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-w-lg mx-auto">
        <DrawerHeader>
          <DrawerTitle>You just bought something, did you?</DrawerTitle>
          <DrawerDescription>
            Add a expense to record your spending.
          </DrawerDescription>
        </DrawerHeader>

        <form action={createExpense} className="px-4 flex flex-col gap-4">
          <Input type="text" id="title" name="title" placeholder="Name" />

          <Input type="number" id="amount" name="amount" placeholder="Amount" />

          {/* {eTypes.length > 1 && (
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {eTypes.map((type) => (
                    <SelectItem key={type.type_id} value="apple">
                      {type.type_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )} */}

          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
