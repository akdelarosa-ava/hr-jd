"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SearchResult = () => {
  return (
    <>
      <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl text-wrap">
        Top 3 Search Result:
      </h2>
      <p className="text-base">
        Select the Job Title to view the full description or modify your search
        for different results.
      </p>
      <div className="flex flex-col md:flex-row gap-3">
        <Card className="w-full md:w-1/3 bg-gray-100 hover:border-gray-500 drop-shadow-lg">
          <CardHeader className="text-lg">Job 1</CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero...
          </CardContent>
        </Card>

        <Card className="w-full md:w-1/3 bg-gray-100 hover:border-gray-500 drop-shadow-lg">
          <CardHeader className="text-lg">Job 2</CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero...
          </CardContent>
        </Card>

        <Card className="w-full md:w-1/3 bg-gray-100 hover:border-gray-500 drop-shadow-lg">
          <CardHeader className="text-lg">Job 3</CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero...
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SearchResult;
