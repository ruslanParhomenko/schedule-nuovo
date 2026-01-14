export default function NotAuth({ name }: { name: string }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <span className="text-rd text-center">
        {name}, просьба отправить свою почту для получения расписания
      </span>
    </div>
  );
}
