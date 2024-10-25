export const InputOTP = ({ ...props }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        maxLength={1} // Chaque input n'accepte qu'un seul caractère
        className="size-12 rounded-md border-2 text-center caret-customDark outline-0 focus:border-customDark"
        {...props}
      />
    </div>
  )
}
