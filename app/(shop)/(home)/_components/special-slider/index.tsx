import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BestSellingSlider from "./best-selling-slider";
import NewArrivalsSlider from "./new-arrivals-slider";

const SpecialSlider = () => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-6 mt-10">
      <Tabs defaultValue="best_selling" className="w-full">
        <TabsList className="flex justify-center mb-6 bg-transparent">
          <TabsTrigger
            value="best_selling"
            className="px-6 py-2 text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900 focus:outline-none focus:text-gray-900">
            Best Selling
          </TabsTrigger>
          <TabsTrigger
            value="new_arrivals"
            className="px-6 py-2 text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900 focus:outline-none focus:text-gray-900">
            New Arrivals
          </TabsTrigger>
        </TabsList>
        <TabsContent value="best_selling">
          <BestSellingSlider />
        </TabsContent>
        <TabsContent value="new_arrivals">
          <NewArrivalsSlider />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpecialSlider;
