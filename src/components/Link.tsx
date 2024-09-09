import Link from "next/link"

interface InternalLinkProps {
  href: string
  external?: boolean
}

export function _Link(
  props: React.PropsWithChildren<
    InternalLinkProps &
      React.RefAttributes<HTMLAnchorElement> &
      Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className">
  >
) {
  return (
    <Link {...props} href={props.href}>
      {props.children}
    </Link>
  )
}
