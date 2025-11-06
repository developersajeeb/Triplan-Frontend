import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface AccordionItemType {
  title: string
  content: string
}

interface Props {
  items: AccordionItemType[];
  defaultOpen?: number;
}

export default function CommonAccordion({ items, defaultOpen }: Props) {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full" defaultValue={String(defaultOpen)}>
        {items.map((item, index) => (
          <AccordionItem value={String(index)} key={index} className="py-2">
            <AccordionTrigger className="py-2 text-[18px] md:text-[20px] text-primary-950 leading-6 hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="pb-2 text-base font-medium text-gray-500">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
