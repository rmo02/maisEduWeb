export function Anotacoes() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center">
        <textarea className="w-full h- placeholder-blue-600 placeholder:text-sm text-lg outline-none px-2 scrollbar-thin resize-none" />
        <button className="w-full bg-blue-600">Salvar</button>
      </div>
    </div>
  );
}
