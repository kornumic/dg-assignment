import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormCardProps {
  children: React.ReactNode;
  cardTitle: string;
  cardDescription?: string;
}

export const FormCard: React.FC<FormCardProps> = ({
  children,
  cardTitle,
  cardDescription,
}) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        {cardDescription && (
          <CardDescription className="text-sky-600">
            {cardDescription}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
