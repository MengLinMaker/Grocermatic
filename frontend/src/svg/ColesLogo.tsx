import { splitProps } from 'solid-js'

export const ColesLogo = (props: any) => {
  const [local, others] = splitProps(props, ['class'])
  return (
    <svg role="img" viewBox="19.955 10 401.421 122.839" class={local.class}>
      <path d="m114.85 96.512c-5.233 20.925-24.218 36.306-46.783 36.327-26.565-.02-48.112-21.572-48.067-48.174-.045-26.59 21.502-48.132 48.067-48.12 22.458-.012 41.398 15.62 46.782 36.368h-19.554a29.064 29.064 0 0 0 -26.815-17.519c-16.21-.044-29.338 13.062-29.338 29.271 0 16.213 13.128 29.345 29.337 29.345 11.995 0 22.343-7.196 26.816-17.498m71.081-59.967c-26.548-.034-48.12 21.53-48.187 48.087.066 26.63 21.639 48.166 48.187 48.183 26.626-.017 48.17-21.552 48.216-48.183-.046-26.557-21.59-48.12-48.216-48.087m0 77.152c-16.012.029-29.027-13.004-29.027-29.065 0-16.01 13.015-29.028 29.027-29.057 16.07.029 29.085 13.046 29.085 29.057 0 16.061-13.015 29.094-29.085 29.065" />
      <path d="m220.672 10v122.815h21.131v-122.815z" />
      <path d="m297.359 114.315c-14.784-.045-27.1-10.912-27.125-24.01.025-.474.062-.952.111-1.397h69.248c.029-38.18-19.702-52.536-43.968-52.536-18.719 0-45.777 12.032-45.732 47.762-.045 29.589 21.428 48.701 45.732 48.68 20.93.021 38.67-12.616 43.033-33.484h-19.426c-2.999 9.498-11.46 14.94-21.873 14.985m-2.04-60.96c12.194 0 22.278 8.507 23.785 19.25l-47.123-.112-.499.226c1.36-10.89 11.518-19.364 23.838-19.364m103.598 13.462h18.314s.824-16.378-12.848-24.592c0 0-6.471-5.878-24.5-5.85 0 0-18.166-.234-26.438 7.988 0 0-8.556 6.455-8.605 19.13 0 0-1.503 12.193 10.446 19.846 0 0 9.746 4.638 19.146 7.381 0 0 15.25 4.144 17.8 5.68 0 0 13.111 6.052 5.255 13.68 0 0-3.497 4.919-15.38 4.943 0 0-20.795.734-20.766-15.075h-18.606s-1.763 16.83 12.55 26.201c0 0 9.162 6.25 26.916 6.085 0 0 17.066-.198 26.137-6.698 0 0 11.673-8.391 11.637-22.68 0 0 1.4-14.668-17.01-22.837 0 0-18.593-6.295-23.322-7.526 0 0-18.33-4.054-14.673-13.252 0 0 .85-6.26 15.513-6.26 0 0 10.385-.186 14.9 5.655 0 0 3.11 3.55 3.534 8.18" />
    </svg>
  )
}
