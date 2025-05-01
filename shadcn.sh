components=(
  label input button form card dialog dropdown-menu popover select
  switch checkbox textarea toast tooltip tabs avatar badge alert
  skeleton separator
)

for comp in "${components[@]}"
do
  npx shadcn@latest add $comp
done
