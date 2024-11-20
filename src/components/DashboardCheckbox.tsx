"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";

// Schema for form validation
const FormSchema = z.object({
  items: z.array(
    z.object({
      widgetId: z.number(),
      isVisible: z.boolean(),
    })
  ),
});

function DashboardCheckbox() {
  const router = useRouter();
  const [widgets, setWidgets] = useState<
    { widgetId: number; widgetLabel: string; is_visible: boolean }[]
  >([]);

  // Fetch the widget data from API
  useEffect(() => {
    const fetchWidgets = async () => {
      const userId = sessionStorage.getItem("user_id");
      const token = sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8085/api/widget/widget-preferences/${userId}`,
          { headers: { token: token } }
        );
        if (response.data.status === "success") {
          setWidgets(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching widgets:", error);
      }
    };

    fetchWidgets();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  // Populate form values when widgets are loaded
  useEffect(() => {
    if (widgets.length > 0) {
      form.setValue(
        "items",
        widgets.map((widget) => ({
          widgetId: widget.widgetId,
          isVisible: widget.is_visible,
        }))
      );
    }
  }, [widgets, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const updates = data.items.map(({ widgetId, isVisible }) => ({
      widgetId,
      isVisible,
    }));

    const userId = sessionStorage.getItem("user_id");
    const token = sessionStorage.getItem("token");
    const payload = { userId, updates };

    try {
      await axios.put(
        "http://localhost:8085/api/widget/update-widget-preferences/", payload, { headers: { token: token } });
      alert("Preferences updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating widgets:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {widgets.map((widget) => (
          <FormField
            key={widget.widgetId}
            control={form.control}
            name="items"
            render={({ field }) => {
              const itemIndex = field.value.findIndex(
                (item) => item.widgetId === widget.widgetId
              );

              const isChecked =
                itemIndex > -1 ? field.value[itemIndex].isVisible : false;

              return (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        const isChecked = Boolean(checked);
                        const updatedItems = [...field.value];

                        const itemIndex = updatedItems.findIndex(
                          (item) => item.widgetId === widget.widgetId
                        );

                        if (itemIndex > -1) {
                          updatedItems[itemIndex].isVisible = isChecked;
                        } else {
                          updatedItems.push({
                            widgetId: widget.widgetId,
                            isVisible: isChecked,
                          });
                        }

                        field.onChange(updatedItems);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {widget.widgetLabel}
                  </FormLabel>
                </FormItem>
              );
            }}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default DashboardCheckbox;
