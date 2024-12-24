import EditForm from "../EditForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditRecipePage({ params }: Props) {
  const id = (await params).id;

  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
  });

  if (!recipe) {
    return <div>Not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <EditForm recipe={recipe} />
    </div>
  );
}
