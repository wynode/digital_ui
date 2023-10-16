// function Elements({ size }: { size: number }) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24">
//       <path
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinejoin="round"
//         d="M6.5 4.25l.75-.75a2.121 2.121 0 0 1 3 3L6.5 10.25 2.75 6.5a2.121 2.121 0 0 1 3-3l.75.75zm7 6l4-7.5 4 7.5h-8zm-10.75 3.5h7.5v7.5h-7.5v-7.5zm14.75-.25a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
//       ></path>
//     </svg>
//   )
// }

// export default Elements

function Elements({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24">
      <path
        d="M20.25 1H3.75C3.02065 1 2.32118 1.28973 1.80546 1.80546C1.28973 2.32118 1 3.02065 1 3.75L1 23H23V3.75C23 3.02065 22.7103 2.32118 22.1945 1.80546C21.6788 1.28973 20.9793 1 20.25 1V1ZM21.1667 21.1667H2.83333V3.75C2.83333 3.50688 2.92991 3.27373 3.10182 3.10182C3.27373 2.92991 3.50688 2.83333 3.75 2.83333H20.25C20.4931 2.83333 20.7263 2.92991 20.8982 3.10182C21.0701 3.27373 21.1667 3.50688 21.1667 3.75V21.1667ZM6.5 6.5H17.5V10.1667H15.6667V8.33333H12.9167V15.6667H14.75V17.5H9.25V15.6667H11.0833V8.33333H8.33333V10.1667H6.5V6.5Z"
        fill="#444444"
      />
    </svg>
  )
}
export default Elements
