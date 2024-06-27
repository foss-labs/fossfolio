import { Card, CardContent } from "@app/ui/components/card";
import React from "react";
import { Button } from "@app/components/ui/Button";
import { Skeleton } from "@app/ui/components/skeleton";
import { LuClipboard } from "react-icons/lu";

type Props = {
  count: number;
};

export const FormsLoader = ({ count }: Props) => {
  return (
    <>
      {new Array(count).fill(0).map((el, index) => (
        <Card className="p-2" key={index}>
          <CardContent className="flex flex-col justify-between h-[120px]">
            <div>
              <h3 className="text-lg font-semibold">
                <Skeleton className="w-10 h-3" />
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1"></p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <LuClipboard className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  <Skeleton className="w-10 h-3" />
                </span>
              </div>
              <Button variant="outline">
                <Skeleton className="w-10 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
