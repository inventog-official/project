import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Battery, Power, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const Feature108 = ({
  badge = "Solar Solutions",
  heading = "Solar Systems We Offer",
  description = "Discover our range of solar solutions designed to meet your specific energy needs",
  tabs = [
    {
      value: "on-grid",
      icon: <Power className="h-auto w-4 shrink-0" />,
      label: "On-Grid Systems",
      content: {
        badge: "Grid Connected",
        title: "On-Grid Solar Systems for Continuous Power Supply",
        description:
          "Residential and commercial solar systems are predominantly powered by on-grid solar systems. They are linked to the electricity network, enabling you to return surplus energy to the grid, resulting in credits or financial compensation. This system assists you in lowering your monthly electricity expenses while also being environmentally conscious.",
        buttonText: "Learn More",
        imageSrc:
          "https://images.pexels.com/photos/356049/pexels-photo-356049.jpeg",
        imageAlt: "On-grid solar system installation",
      },
    },
    {
      value: "off-grid",
      icon: <Battery className="h-auto w-4 shrink-0" />,
      label: "Off-Grid Systems",
      content: {
        badge: "Energy Independence",
        title: "Off-Grid Solar Systems for Complete Energy Independence",
        description:
          "Off-grid solar systems are ideal for regions where there is no connection to the electricity grid. This system employs batteries to store energy, enabling you to utilize solar power even when the sun is not visible. It's an ideal choice for remote homes, farms, or businesses that need a reliable source of electricity without any interruptions.",
        buttonText: "Explore Options",
        imageSrc:
          "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg",
        imageAlt: "Off-grid solar installation",
      },
    },
    {
      value: "hybrid",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "Hybrid Systems",
      content: {
        badge: "Best of Both",
        title: "Hybrid Solar Systems for the Best of Both Worlds",
        description:
          "Hybrid solar systems combine the advantages of both on-grid and off-grid systems. This system is linked to the power grid, but it also incorporates energy storage through batteries. This enables you to save surplus energy during the day and utilize it when required, even in the event of a power outage.",
        buttonText: "See Details",
        imageSrc:
          "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg",
        imageAlt: "Hybrid solar system",
      },
    },
  ],
}: Feature108Props) => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{badge}</Badge>
          <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className=" flex flex-col bg-inherit items-center justify-center gap-4 sm:flex-row md:gap-10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-muted/70 p-6 lg:p-16">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">
                    {tab.content.title}
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    {tab.content.description}
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg">
                    {tab.content.buttonText}
                  </Button>
                </div>
                <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
                  <img
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { Feature108 };
