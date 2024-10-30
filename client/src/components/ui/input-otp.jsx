export const InputOTP = ({ ...props }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        maxLength={1} // Chaque input n'accepte qu'un seul caractère
        className="flex h-12 w-12 text-center font-bold md:text-2xl items-center justify-center rounded-md border-2 border-zinc-300 bg-background  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-customDark focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:font-semibold"
        {...props}
      />
    </div>
  )
}
