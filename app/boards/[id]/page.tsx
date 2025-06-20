export default async function BoardPage({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params
    return (
        <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <h1>Board ID: {id}</h1>
        </div>
    );
  }