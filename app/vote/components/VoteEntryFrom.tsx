"use client";

import { useForm } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import toast from "react-hot-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { useRef, useState } from "react";
import { format } from "date-fns";
import { FaTrash } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { cn, nextWeek } from "@/lib/utils";
import { createVote } from "@/lib/db";

const FormSchema = z.object({
  vote_options: z
    .array(z.string())
    .refine((value) => value.length >= 2 && value.length <= 6, {
      message: "You have to select at least two items and max at six items.",
    }),
  title: z.string().min(5, { message: "Title has a minimum characters of 5" }),
  description: z.string().optional(),
  end_date: z.date(),
});

export default function VoteEntryForm() {
  const [options, setOptions] = useState<{ id: string; label: string }[]>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      vote_options: [],
    },
  });

  const optionRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const addOption = () => {
    const newOption = optionRef.current?.value.trim();
    if (newOption) {
      if (!form.getValues("vote_options").includes(newOption)) {
        form.setValue("vote_options", [
          ...options.map((o) => o.id),
          optionRef.current.value,
        ]);
        setOptions((options) => [
          ...options,
          { id: optionRef.current.value, label: optionRef.current.value },
        ]);
        optionRef.current.value = "";
      } else {
        toast.error("Option already exists");
      }
    } else {
      toast.error("Option can't be empty");
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const vote_options: { [key: string]: number } = {};
    data.vote_options.forEach((option) => {
      vote_options[option] = 0;
    });
    const insertData = {
      ...data,
      vote_options,
    };

    toast.promise(createVote(insertData), {
      loading: "Creating vote...",
      success: "Vote created",
      error: "Failed to create vote",
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Optional description for your vote.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="end_date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Vote Options</FormLabel>
                <FormDescription>
                  You can not edit your vote option. Please double check 📌.
                </FormDescription>
              </div>
              {options.map((option, index) => (
                <FormField
                  key={option.id}
                  name={`vote_options.${index}`}
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem
                        className="flex items-center space-x-2"
                        key={option.id}
                      >
                        <div className="flex items-center space-x-2">
                          <FaTrash
                            className="w-4 h-4 cursor-pointer text-red-500 opacity-50 hover:opacity-100 transition-opacity duration-200 ease-in-out"
                            onClick={() => {
                              setOptions(
                                options.filter((o) => o.id !== option.id)
                              );
                              form.setValue(
                                "vote_options",
                                form
                                  .getValues()
                                  .vote_options.filter((id) => id !== option.id)
                              );
                            }}
                          />
                          <FormControl>
                            <Checkbox
                              checked={field.value.includes(option.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  form.setValue("vote_options", [
                                    ...form.getValues().vote_options,
                                    option.id,
                                  ]);
                                } else {
                                  form.setValue(
                                    "vote_options",
                                    form
                                      .getValues()
                                      .vote_options.filter(
                                        (id) => id !== option.id
                                      )
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-lg">
                            {option.label}
                          </FormLabel>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <Input
                type="text"
                placeholder="Add option"
                ref={optionRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addOption();
                  }
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <FaRegCalendarAlt className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > nextWeek() || date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create Vote
        </Button>
      </form>
    </Form>
  );
}
