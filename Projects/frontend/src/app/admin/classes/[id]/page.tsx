export default async function Page({ params }) {
    const slug = (await params).id;
    return <div>My Post: {slug}</div>
  }