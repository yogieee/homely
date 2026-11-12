type SideKolamProps = {
  left?: boolean;
  right?: boolean;
};

export default function SideKolam({ left = true, right = true }: SideKolamProps) {
  return (
    <>
      {left && (
        <div aria-hidden="true" className="hidden xl:block absolute inset-y-10 left-2 2xl:left-6 kolam-vertical opacity-60 pointer-events-none" />
      )}
      {right && (
        <div aria-hidden="true" className="hidden xl:block absolute inset-y-10 right-2 2xl:right-6 kolam-vertical opacity-60 pointer-events-none" />
      )}
    </>
  );
}
