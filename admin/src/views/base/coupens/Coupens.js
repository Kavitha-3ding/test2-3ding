// // // import React from 'react'
// // // import {
// // //   CButton,
// // //   CCard,
// // //   CCardBody,
// // //   CCardFooter,
// // //   CCardGroup,
// // //   CCardHeader,
// // //   CCardImage,
// // //   CCardLink,
// // //   CCardSubtitle,
// // //   CCardText,
// // //   CCardTitle,
// // //   CListGroup,
// // //   CListGroupItem,
// // //   CNav,
// // //   CNavItem,
// // //   CNavLink,
// // //   CCol,
// // //   CRow,
// // // } from '@coreui/react'
// // // import { DocsComponents, DocsExample } from 'src/components'

// // // import ReactImg from 'src/assets/images/react.jpg'

// // // const Cards = () => {
// // //   return (
// // //     <CRow>
// // //       <CCol xs={12}>
// // //         <DocsComponents href="components/card/" />
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>Example</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               Cards are built with as little markup and styles as possible but still manage to
// // //               deliver a bunch of control and customization. Built with flexbox, they offer easy
// // //               alignment and mix well with other CoreUI components. Cards have no top, left, and
// // //               right margins by default, so use{' '}
// // //               <a href="https://coreui.io/docs/utilities/spacing">spacing utilities</a> as needed.
// // //               They have no fixed width to start, so they&#39;ll fill the full width of its parent.
// // //             </p>
// // //             <p className="text-body-secondary small">
// // //               Below is an example of a basic card with mixed content and a fixed width. Cards have
// // //               no fixed width to start, so they&#39;ll naturally fill the full width of its parent
// // //               element.
// // //             </p>
// // //             <DocsExample href="components/card">
// // //               <CCard style={{ width: '18rem' }}>
// // //                 <CCardImage orientation="top" src={ReactImg} />
// // //                 <CCardBody>
// // //                   <CCardTitle>Card title</CCardTitle>
// // //                   <CCardText>
// // //                     Some quick example text to build on the card title and make up the bulk of the
// // //                     card&#39;s content.
// // //                   </CCardText>
// // //                   <CButton color="primary" href="#">
// // //                     Go somewhere
// // //                   </CButton>
// // //                 </CCardBody>
// // //               </CCard>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //       <CCol xs={12}>
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>Body</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               The main block of a card is the <code>&lt;CCardBody&gt;</code>. Use it whenever you
// // //               need a padded section within a card.
// // //             </p>
// // //             <DocsExample href="components/card/#body">
// // //               <CCard>
// // //                 <CCardBody>This is some text within a card body.</CCardBody>
// // //               </CCard>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //       <CCol xs={12}>
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>Titles, text, and links</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               Card titles are managed by <code>&lt;CCardTitle&gt;</code> component. Identically,
// // //               links are attached and collected next to each other by <code>&lt;CCardLink&gt;</code>{' '}
// // //               component.
// // //             </p>
// // //             <p className="text-body-secondary small">
// // //               Subtitles are managed by <code>&lt;CCardSubtitle&gt;</code> component. If the{' '}
// // //               <code>&lt;CCardTitle&gt;</code> also, the <code>&lt;CCardSubtitle&gt;</code> items are
// // //               stored in a <code>&lt;CCardBody&gt;</code> item, the card title, and subtitle are
// // //               arranged rightly.
// // //             </p>
// // //             <DocsExample href="components/card/#titles-text-and-links">
// // //               <CCard style={{ width: '18rem' }}>
// // //                 <CCardBody>
// // //                   <CCardTitle>Card title</CCardTitle>
// // //                   <CCardSubtitle className="mb-2 text-body-secondary">Card subtitle</CCardSubtitle>
// // //                   <CCardText>
// // //                     Some quick example text to build on the card title and make up the bulk of the
// // //                     card&#39;s content.
// // //                   </CCardText>
// // //                   <CCardLink href="#">Card link</CCardLink>
// // //                   <CCardLink href="#">Another link</CCardLink>
// // //                 </CCardBody>
// // //               </CCard>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //       <CCol xs={12}>
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>Images</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               <code>.card-img-top</code> places a picture to the top of the card. With{' '}
// // //               <code>.card-text</code>, text can be added to the card. Text within{' '}
// // //               <code>.card-text</code> can additionally be styled with the regular HTML tags.
// // //             </p>
// // //             <DocsExample href="components/card/#images">
// // //               <CCard style={{ width: '18rem' }}>
// // //                 <CCardImage orientation="top" src={ReactImg} />
// // //                 <CCardBody>
// // //                   <CCardText>
// // //                     Some quick example text to build on the card title and make up the bulk of the
// // //                     card&#39;s content.
// // //                   </CCardText>
// // //                 </CCardBody>
// // //               </CCard>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //       <CCol xs={12}>
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>List groups</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               Create lists of content in a card with a flush list group.
// // //             </p>
// // //             <DocsExample href="components/card/#list-groups">
// // //               <CRow>
// // //                 <CCol lg={4}>
// // //                   <CCard>
// // //                     <CListGroup flush>
// // //                       <CListGroupItem>Cras justo odio</CListGroupItem>
// // //                       <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
// // //                       <CListGroupItem>Vestibulum at eros</CListGroupItem>
// // //                     </CListGroup>
// // //                   </CCard>
// // //                 </CCol>
// // //                 <CCol lg={4}>
// // //                   <CCard>
// // //                     <CCardHeader>Header</CCardHeader>
// // //                     <CListGroup flush>
// // //                       <CListGroupItem>Cras justo odio</CListGroupItem>
// // //                       <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
// // //                       <CListGroupItem>Vestibulum at eros</CListGroupItem>
// // //                     </CListGroup>
// // //                   </CCard>
// // //                 </CCol>
// // //                 <CCol lg={4}>
// // //                   <CCard>
// // //                     <CListGroup flush>
// // //                       <CListGroupItem>Cras justo odio</CListGroupItem>
// // //                       <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
// // //                       <CListGroupItem>Vestibulum at eros</CListGroupItem>
// // //                     </CListGroup>
// // //                     <CCardFooter>Footer</CCardFooter>
// // //                   </CCard>
// // //                 </CCol>
// // //               </CRow>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //       <CCol xs={12}>
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>Kitchen sink</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               Combine and match many content types to build the card you need, or throw everything
// // //               in there. Shown below are image styles, blocks, text styles, and a list group—all
// // //               wrapped in a fixed-width card.
// // //             </p>
// // //             <DocsExample href="components/card/#kitchen-sink">
// // //               <CCard style={{ width: '18rem' }}>
// // //                 <CCardImage orientation="top" src={ReactImg} />
// // //                 <CCardBody>
// // //                   <CCardTitle>Card title</CCardTitle>
// // //                   <CCardText>
// // //                     Some quick example text to build on the card title and make up the bulk of the
// // //                     card&#39;s content.
// // //                   </CCardText>
// // //                 </CCardBody>
// // //                 <CListGroup flush>
// // //                   <CListGroupItem>Cras justo odio</CListGroupItem>
// // //                   <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
// // //                   <CListGroupItem>Vestibulum at eros</CListGroupItem>
// // //                 </CListGroup>
// // //                 <CCardBody>
// // //                   <CCardLink href="#">Card link</CCardLink>
// // //                   <CCardLink href="#">Another link</CCardLink>
// // //                 </CCardBody>
// // //               </CCard>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //       <CCol xs={12}>
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>Header and footer</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               Add an optional header and/or footer within a card.
// // //             </p>
// // //             <DocsExample href="components/card/#header-and-footer">
// // //               <CCard>
// // //                 <CCardHeader>Header</CCardHeader>
// // //                 <CCardBody>
// // //                   <CCardTitle>Special title treatment</CCardTitle>
// // //                   <CCardText>
// // //                     With supporting text below as a natural lead-in to additional content.
// // //                   </CCardText>
// // //                   <CButton color="primary" href="#">
// // //                     Go somewhere
// // //                   </CButton>
// // //                 </CCardBody>
// // //               </CCard>
// // //             </DocsExample>
// // //             <p className="text-body-secondary small">
// // //               Card headers can be styled by adding ex. <code>as=&#34;h5&#34;</code>.
// // //             </p>
// // //             <DocsExample href="components/card/#header-and-footer">
// // //               <CCard>
// // //                 <CCardHeader as="h5">Header</CCardHeader>
// // //                 <CCardBody>
// // //                   <CCardTitle>Special title treatment</CCardTitle>
// // //                   <CCardText>
// // //                     With supporting text below as a natural lead-in to additional content.
// // //                   </CCardText>
// // //                   <CButton color="primary" href="#">
// // //                     Go somewhere
// // //                   </CButton>
// // //                 </CCardBody>
// // //               </CCard>
// // //             </DocsExample>
// // //             <DocsExample href="components/card/#header-and-footer">
// // //               <CCard>
// // //                 <CCardHeader>Quote</CCardHeader>
// // //                 <CCardBody>
// // //                   <blockquote className="blockquote mb-0">
// // //                     <p>
// // //                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat
// // //                       a ante.
// // //                     </p>
// // //                     <footer className="blockquote-footer">
// // //                       Someone famous in <cite title="Source Title">Source Title</cite>
// // //                     </footer>
// // //                   </blockquote>
// // //                 </CCardBody>
// // //               </CCard>
// // //             </DocsExample>
// // //             <DocsExample href="components/card/#header-and-footer">
// // //               <CCard className="text-center">
// // //                 <CCardHeader>Header</CCardHeader>
// // //                 <CCardBody>
// // //                   <CCardTitle>Special title treatment</CCardTitle>
// // //                   <CCardText>
// // //                     With supporting text below as a natural lead-in to additional content.
// // //                   </CCardText>
// // //                   <CButton color="primary" href="#">
// // //                     Go somewhere
// // //                   </CButton>
// // //                 </CCardBody>
// // //                 <CCardFooter className="text-body-secondary">2 days ago</CCardFooter>
// // //               </CCard>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //       <CCol xs={12}>
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>Body</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               Cards assume no specific <code>width</code> to start, so they&#39;ll be 100% wide
// // //               unless otherwise stated. You can adjust this as required with custom CSS, grid
// // //               classes, grid Sass mixins, or services.
// // //             </p>
// // //             <h3>Using grid markup</h3>
// // //             <p className="text-body-secondary small">
// // //               Using the grid, wrap cards in columns and rows as needed.
// // //             </p>
// // //             <DocsExample href="components/card/#sizing">
// // //               <CRow>
// // //                 <CCol sm={6}>
// // //                   <CCard>
// // //                     <CCardBody>
// // //                       <CCardTitle>Special title treatment</CCardTitle>
// // //                       <CCardText>
// // //                         With supporting text below as a natural lead-in to additional content.
// // //                       </CCardText>
// // //                       <CButton color="primary" href="#">
// // //                         Go somewhere
// // //                       </CButton>
// // //                     </CCardBody>
// // //                   </CCard>
// // //                 </CCol>
// // //                 <CCol sm={6}>
// // //                   <CCard>
// // //                     <CCardBody>
// // //                       <CCardTitle>Special title treatment</CCardTitle>
// // //                       <CCardText>
// // //                         With supporting text below as a natural lead-in to additional content.
// // //                       </CCardText>
// // //                       <CButton color="primary" href="#">
// // //                         Go somewhere
// // //                       </CButton>
// // //                     </CCardBody>
// // //                   </CCard>
// // //                 </CCol>
// // //               </CRow>
// // //             </DocsExample>
// // //             <h3>Using utilities</h3>
// // //             <p className="text-body-secondary small">
// // //               Use some of{' '}
// // //               <a href="https://coreui.io/docs/utilities/sizing/">available sizing utilities</a> to
// // //               rapidly set a card&#39;s width.
// // //             </p>
// // //             <DocsExample href="components/card/#sizing">
// // //               <CCard className="w-75">
// // //                 <CCardBody>
// // //                   <CCardTitle>Card title</CCardTitle>
// // //                   <CCardText>
// // //                     With supporting text below as a natural lead-in to additional content.
// // //                   </CCardText>
// // //                   <CButton color="primary" href="#">
// // //                     Go somewhere
// // //                   </CButton>
// // //                 </CCardBody>
// // //               </CCard>
// // //               <CCard className="w-50">
// // //                 <CCardBody>
// // //                   <CCardTitle>Card title</CCardTitle>
// // //                   <CCardText>
// // //                     With supporting text below as a natural lead-in to additional content.
// // //                   </CCardText>
// // //                   <CButton color="primary" href="#">
// // //                     Go somewhere
// // //                   </CButton>
// // //                 </CCardBody>
// // //               </CCard>
// // //             </DocsExample>
// // //             <strong>Using custom CSS</strong>
// // //             <p className="text-body-secondary small">
// // //               Use custom CSS in your stylesheets or as inline styles to set a width.
// // //             </p>
// // //             <DocsExample href="components/card/#sizing">
// // //               <CCard style={{ width: '18rem' }}>
// // //                 <CCardBody>
// // //                   <CCardTitle>Special title treatment</CCardTitle>
// // //                   <CCardText>
// // //                     With supporting text below as a natural lead-in to additional content.
// // //                   </CCardText>
// // //                   <CButton color="primary" href="#">
// // //                     Go somewhere
// // //                   </CButton>
// // //                 </CCardBody>
// // //               </CCard>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //       <CCol xs={12}>
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>Text alignment</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               You can instantly change the text arrangement of any card—in its whole or specific
// // //               parts—with{' '}
// // //               <a href="https://coreui.io/docs/utilities/text/#text-alignment">text align classes</a>
// // //               .
// // //             </p>
// // //             <DocsExample href="components/card/#text-alignment">
// // //               <CCard style={{ width: '18rem' }}>
// // //                 <CCardBody>
// // //                   <CCardTitle>Special title treatment</CCardTitle>
// // //                   <CCardText>
// // //                     With supporting text below as a natural lead-in to additional content.
// // //                   </CCardText>
// // //                   <CButton color="primary" href="#">
// // //                     Go somewhere
// // //                   </CButton>
// // //                 </CCardBody>
// // //               </CCard>
// // //               <CCard className="text-center" style={{ width: '18rem' }}>
// // //                 <CCardBody>
// // //                   <CCardTitle>Special title treatment</CCardTitle>
// // //                   <CCardText>
// // //                     With supporting text below as a natural lead-in to additional content.
// // //                   </CCardText>
// // //                   <CButton color="primary" href="#">
// // //                     Go somewhere
// // //                   </CButton>
// // //                 </CCardBody>
// // //               </CCard>
// // //               <CCard className="text-end" style={{ width: '18rem' }}>
// // //                 <CCardBody>
// // //                   <CCardTitle>Special title treatment</CCardTitle>
// // //                   <CCardText>
// // //                     With supporting text below as a natural lead-in to additional content.
// // //                   </CCardText>
// // //                   <CButton color="primary" href="#">
// // //                     Go somewhere
// // //                   </CButton>
// // //                 </CCardBody>
// // //               </CCard>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //       <CCol xs={12}>
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>Navigation</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               Add some navigation to a <code>&lt;CCardHeader&gt;</code> with our{' '}
// // //               <code>&lt;CNav&gt;</code> component.
// // //             </p>
// // //             <DocsExample href="components/card/##navigation">
// // //               <CCard className="text-center">
// // //                 <CCardHeader>
// // //                   <CNav variant="tabs" className="card-header-tabs">
// // //                     <CNavItem>
// // //                       <CNavLink href="#" active>
// // //                         Active
// // //                       </CNavLink>
// // //                     </CNavItem>
// // //                     <CNavItem>
// // //                       <CNavLink href="#">Link</CNavLink>
// // //                     </CNavItem>
// // //                     <CNavItem>
// // //                       <CNavLink href="#" disabled>
// // //                         Disabled
// // //                       </CNavLink>
// // //                     </CNavItem>
// // //                   </CNav>
// // //                 </CCardHeader>
// // //                 <CCardBody>
// // //                   <CCardTitle>Special title treatment</CCardTitle>
// // //                   <CCardText>
// // //                     With supporting text below as a natural lead-in to additional content.
// // //                   </CCardText>
// // //                   <CButton color="primary" href="#">
// // //                     Go somewhere
// // //                   </CButton>
// // //                 </CCardBody>
// // //               </CCard>
// // //             </DocsExample>
// // //             <DocsExample href="components/card/##navigation">
// // //               <CCard className="text-center">
// // //                 <CCardHeader>
// // //                   <CNav variant="pills" className="card-header-pills">
// // //                     <CNavItem>
// // //                       <CNavLink href="#" active>
// // //                         Active
// // //                       </CNavLink>
// // //                     </CNavItem>
// // //                     <CNavItem>
// // //                       <CNavLink href="#">Link</CNavLink>
// // //                     </CNavItem>
// // //                     <CNavItem>
// // //                       <CNavLink href="#" disabled>
// // //                         Disabled
// // //                       </CNavLink>
// // //                     </CNavItem>
// // //                   </CNav>
// // //                 </CCardHeader>
// // //                 <CCardBody>
// // //                   <CCardTitle>Special title treatment</CCardTitle>
// // //                   <CCardText>
// // //                     With supporting text below as a natural lead-in to additional content.
// // //                   </CCardText>
// // //                   <CButton color="primary" href="#">
// // //                     Go somewhere
// // //                   </CButton>
// // //                 </CCardBody>
// // //               </CCard>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //       <CCol xs={12}>
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>Image caps</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               Similar to headers and footers, cards can include top and bottom &#34;image
// // //               caps&#34;—images at the top or bottom of a card.
// // //             </p>
// // //             <DocsExample href="components/card/#image-caps">
// // //               <CRow>
// // //                 <CCol lg={6}>
// // //                   <CCard className="mb-3">
// // //                     <CCardImage orientation="top" src={ReactImg} />
// // //                     <CCardBody>
// // //                       <CCardTitle>Card title</CCardTitle>
// // //                       <CCardText>
// // //                         This is a wider card with supporting text below as a natural lead-in to
// // //                         additional content. This content is a little bit longer.
// // //                       </CCardText>
// // //                       <CCardText>
// // //                         <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                       </CCardText>
// // //                     </CCardBody>
// // //                   </CCard>
// // //                 </CCol>
// // //                 <CCol lg={6}>
// // //                   <CCard className="mb-3">
// // //                     <CCardBody>
// // //                       <CCardTitle>Card title</CCardTitle>
// // //                       <CCardText>
// // //                         This is a wider card with supporting text below as a natural lead-in to
// // //                         additional content. This content is a little bit longer.
// // //                       </CCardText>
// // //                       <CCardText>
// // //                         <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                       </CCardText>
// // //                     </CCardBody>
// // //                     <CCardImage orientation="bottom" src={ReactImg} />
// // //                   </CCard>
// // //                 </CCol>
// // //               </CRow>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //       <CCol xs={12}>
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>Card styles</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               Cards include various options for customizing their backgrounds, borders, and color.
// // //             </p>
// // //             <h3>Background and color</h3>
// // //             <p className="text-body-secondary small">
// // //               Use <code>color</code> property to change the appearance of a card.
// // //             </p>
// // //             <DocsExample href="components/card/#background-and-color">
// // //               <CRow>
// // //                 {[
// // //                   { color: 'primary', textColor: 'white' },
// // //                   { color: 'secondary', textColor: 'white' },
// // //                   { color: 'success', textColor: 'white' },
// // //                   { color: 'danger', textColor: 'white' },
// // //                   { color: 'warning' },
// // //                   { color: 'info', textColor: 'white' },
// // //                   { color: 'light' },
// // //                   { color: 'dark', textColor: 'white' },
// // //                 ].map((item, index) => (
// // //                   <CCol lg={4} key={index}>
// // //                     <CCard color={item.color} textColor={item.textColor} className="mb-3">
// // //                       <CCardHeader>Header</CCardHeader>
// // //                       <CCardBody>
// // //                         <CCardTitle>{item.color} card title</CCardTitle>
// // //                         <CCardText>
// // //                           Some quick example text to build on the card title and make up the bulk of
// // //                           the card&#39;s content.
// // //                         </CCardText>
// // //                       </CCardBody>
// // //                     </CCard>
// // //                   </CCol>
// // //                 ))}
// // //               </CRow>
// // //             </DocsExample>
// // //             <h3>Border</h3>
// // //             <p className="text-body-secondary small">
// // //               Use <a href="https://coreui.io/docs/utilities/borders/">border utilities</a> to change
// // //               just the <code>border-color</code> of a card. Note that you can set{' '}
// // //               <code>textColor</code> property on the <code>&lt;CCard&gt;</code> or a subset of the
// // //               card&#39;s contents as shown below.
// // //             </p>
// // //             <DocsExample href="components/card/#border">
// // //               <CRow>
// // //                 {[
// // //                   { color: 'primary', textColor: 'primary' },
// // //                   { color: 'secondary', textColor: 'secondary' },
// // //                   { color: 'success', textColor: 'success' },
// // //                   { color: 'danger', textColor: 'danger' },
// // //                   { color: 'warning', textColor: 'warning' },
// // //                   { color: 'info', textColor: 'info' },
// // //                   { color: 'light' },
// // //                   { color: 'dark' },
// // //                 ].map((item, index) => (
// // //                   <CCol lg={4} key={index}>
// // //                     <CCard textColor={item.textColor} className={`mb-3 border-${item.color}`}>
// // //                       <CCardHeader>Header</CCardHeader>
// // //                       <CCardBody>
// // //                         <CCardTitle>{item.color} card title</CCardTitle>
// // //                         <CCardText>
// // //                           Some quick example text to build on the card title and make up the bulk of
// // //                           the card&#39;s content.
// // //                         </CCardText>
// // //                       </CCardBody>
// // //                     </CCard>
// // //                   </CCol>
// // //                 ))}
// // //               </CRow>
// // //             </DocsExample>
// // //             <h3>Top border</h3>
// // //             <p className="text-body-secondary small">
// // //               Use <a href="https://coreui.io/docs/utilities/borders/">border utilities</a> to change
// // //               just the <code>border-color</code> of a card. Note that you can set{' '}
// // //               <code>textColor</code> property on the <code>&lt;CCard&gt;</code> or a subset of the
// // //               card&#39;s contents as shown below.
// // //             </p>
// // //             <DocsExample href="components/card/#top-border">
// // //               <CRow>
// // //                 {[
// // //                   { color: 'primary', textColor: 'primary' },
// // //                   { color: 'secondary', textColor: 'secondary' },
// // //                   { color: 'success', textColor: 'success' },
// // //                   { color: 'danger', textColor: 'danger' },
// // //                   { color: 'warning', textColor: 'warning' },
// // //                   { color: 'info', textColor: 'info' },
// // //                   { color: 'light' },
// // //                   { color: 'dark' },
// // //                 ].map((item, index) => (
// // //                   <CCol lg={4} key={index}>
// // //                     <CCard
// // //                       textColor={item.textColor}
// // //                       className={`mb-3 border-top-${item.color} border-top-3`}
// // //                     >
// // //                       <CCardHeader>Header</CCardHeader>
// // //                       <CCardBody>
// // //                         <CCardTitle>{item.color} card title</CCardTitle>
// // //                         <CCardText>
// // //                           Some quick example text to build on the card title and make up the bulk of
// // //                           the card&#39;s content.
// // //                         </CCardText>
// // //                       </CCardBody>
// // //                     </CCard>
// // //                   </CCol>
// // //                 ))}
// // //               </CRow>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //       <CCol xs={12}>
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>Card groups</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               Use card groups to render cards as a single, attached element with equal width and
// // //               height columns. Card groups start off stacked and use <code>display: flex;</code> to
// // //               become attached with uniform dimensions starting at the <code>sm</code> breakpoint.
// // //             </p>
// // //             <DocsExample href="components/card/#card-groups">
// // //               <CCardGroup>
// // //                 <CCard>
// // //                   <CCardImage orientation="top" src={ReactImg} />
// // //                   <CCardBody>
// // //                     <CCardTitle>Card title</CCardTitle>
// // //                     <CCardText>
// // //                       This is a wider card with supporting text below as a natural lead-in to
// // //                       additional content. This content is a little bit longer.
// // //                     </CCardText>
// // //                     <CCardText>
// // //                       <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                     </CCardText>
// // //                   </CCardBody>
// // //                 </CCard>
// // //                 <CCard>
// // //                   <CCardImage orientation="top" src={ReactImg} />
// // //                   <CCardBody>
// // //                     <CCardTitle>Card title</CCardTitle>
// // //                     <CCardText>
// // //                       This card has supporting text below as a natural lead-in to additional
// // //                       content.
// // //                     </CCardText>
// // //                     <CCardText>
// // //                       <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                     </CCardText>
// // //                   </CCardBody>
// // //                 </CCard>
// // //                 <CCard>
// // //                   <CCardImage orientation="top" src={ReactImg} />
// // //                   <CCardBody>
// // //                     <CCardTitle>Card title</CCardTitle>
// // //                     <CCardText>
// // //                       This is a wider card with supporting text below as a natural lead-in to
// // //                       additional content. This card has even longer content than the first to show
// // //                       that equal height action.
// // //                     </CCardText>
// // //                     <CCardText>
// // //                       <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                     </CCardText>
// // //                   </CCardBody>
// // //                 </CCard>
// // //               </CCardGroup>
// // //             </DocsExample>
// // //             <p className="text-body-secondary small">
// // //               When using card groups with footers, their content will automatically line up.
// // //             </p>
// // //             <DocsExample href="components/card/#card-groups">
// // //               <CCardGroup>
// // //                 <CCard>
// // //                   <CCardImage orientation="top" src={ReactImg} />
// // //                   <CCardBody>
// // //                     <CCardTitle>Card title</CCardTitle>
// // //                     <CCardText>
// // //                       This is a wider card with supporting text below as a natural lead-in to
// // //                       additional content. This content is a little bit longer.
// // //                     </CCardText>
// // //                   </CCardBody>
// // //                   <CCardFooter>
// // //                     <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                   </CCardFooter>
// // //                 </CCard>
// // //                 <CCard>
// // //                   <CCardImage orientation="top" src={ReactImg} />
// // //                   <CCardBody>
// // //                     <CCardTitle>Card title</CCardTitle>
// // //                     <CCardText>
// // //                       This card has supporting text below as a natural lead-in to additional
// // //                       content.
// // //                     </CCardText>
// // //                   </CCardBody>
// // //                   <CCardFooter>
// // //                     <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                   </CCardFooter>
// // //                 </CCard>
// // //                 <CCard>
// // //                   <CCardImage orientation="top" src={ReactImg} />
// // //                   <CCardBody>
// // //                     <CCardTitle>Card title</CCardTitle>
// // //                     <CCardText>
// // //                       This is a wider card with supporting text below as a natural lead-in to
// // //                       additional content. This card has even longer content than the first to show
// // //                       that equal height action.
// // //                     </CCardText>
// // //                   </CCardBody>
// // //                   <CCardFooter>
// // //                     <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                   </CCardFooter>
// // //                 </CCard>
// // //               </CCardGroup>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //       <CCol xs={12}>
// // //         <CCard className="mb-4">
// // //           <CCardHeader>
// // //             <strong>Card</strong> <small>Grid cards</small>
// // //           </CCardHeader>
// // //           <CCardBody>
// // //             <p className="text-body-secondary small">
// // //               Use the <code>CRow</code> component and set{' '}
// // //               <code>&#123;xs|sm|md|lg|xl|xxl&#125;=&#123;&#123; cols: * &#125;&#125;</code> property
// // //               to control how many grid columns (wrapped around your cards) you show per row. For
// // //               example, here&#39;s <code>xs=&#123;&#123;cols: 1&#125;&#125;</code> laying out the
// // //               cards on one column, and <code>md=&#123;&#123;cols: 1&#125;&#125;</code> splitting
// // //               four cards to equal width across multiple rows, from the medium breakpoint up.
// // //             </p>
// // //             <DocsExample href="components/card/#grid-cards">
// // //               <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
// // //                 <CCol xs>
// // //                   <CCard>
// // //                     <CCardImage orientation="top" src={ReactImg} />
// // //                     <CCardBody>
// // //                       <CCardTitle>Card title</CCardTitle>
// // //                       <CCardText>
// // //                         This is a wider card with supporting text below as a natural lead-in to
// // //                         additional content. This content is a little bit longer.
// // //                       </CCardText>
// // //                     </CCardBody>
// // //                     <CCardFooter>
// // //                       <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                     </CCardFooter>
// // //                   </CCard>
// // //                 </CCol>
// // //                 <CCol xs>
// // //                   <CCard>
// // //                     <CCardImage orientation="top" src={ReactImg} />
// // //                     <CCardBody>
// // //                       <CCardTitle>Card title</CCardTitle>
// // //                       <CCardText>
// // //                         This is a wider card with supporting text below as a natural lead-in to
// // //                         additional content. This content is a little bit longer.
// // //                       </CCardText>
// // //                     </CCardBody>
// // //                     <CCardFooter>
// // //                       <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                     </CCardFooter>
// // //                   </CCard>
// // //                 </CCol>
// // //                 <CCol xs>
// // //                   <CCard>
// // //                     <CCardImage orientation="top" src={ReactImg} />
// // //                     <CCardBody>
// // //                       <CCardTitle>Card title</CCardTitle>
// // //                       <CCardText>
// // //                         This is a wider card with supporting text below as a natural lead-in to
// // //                         additional content. This content is a little bit longer.
// // //                       </CCardText>
// // //                     </CCardBody>
// // //                     <CCardFooter>
// // //                       <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                     </CCardFooter>
// // //                   </CCard>
// // //                 </CCol>
// // //                 <CCol xs>
// // //                   <CCard>
// // //                     <CCardImage orientation="top" src={ReactImg} />
// // //                     <CCardBody>
// // //                       <CCardTitle>Card title</CCardTitle>
// // //                       <CCardText>
// // //                         This is a wider card with supporting text below as a natural lead-in to
// // //                         additional content. This content is a little bit longer.
// // //                       </CCardText>
// // //                     </CCardBody>
// // //                     <CCardFooter>
// // //                       <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                     </CCardFooter>
// // //                   </CCard>
// // //                 </CCol>
// // //               </CRow>
// // //             </DocsExample>
// // //             <p className="text-body-secondary small">
// // //               Change it to <code>md=&#123;&#123; cols: 3&#125;&#125;</code> and you&#39;ll see the
// // //               fourth card wrap.
// // //             </p>
// // //             <DocsExample href="components/card/#grid-cards">
// // //               <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
// // //                 <CCol xs>
// // //                   <CCard>
// // //                     <CCardImage orientation="top" src={ReactImg} />
// // //                     <CCardBody>
// // //                       <CCardTitle>Card title</CCardTitle>
// // //                       <CCardText>
// // //                         This is a wider card with supporting text below as a natural lead-in to
// // //                         additional content. This content is a little bit longer.
// // //                       </CCardText>
// // //                     </CCardBody>
// // //                     <CCardFooter>
// // //                       <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                     </CCardFooter>
// // //                   </CCard>
// // //                 </CCol>
// // //                 <CCol xs>
// // //                   <CCard>
// // //                     <CCardImage orientation="top" src={ReactImg} />
// // //                     <CCardBody>
// // //                       <CCardTitle>Card title</CCardTitle>
// // //                       <CCardText>
// // //                         This is a wider card with supporting text below as a natural lead-in to
// // //                         additional content. This content is a little bit longer.
// // //                       </CCardText>
// // //                     </CCardBody>
// // //                     <CCardFooter>
// // //                       <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                     </CCardFooter>
// // //                   </CCard>
// // //                 </CCol>
// // //                 <CCol xs>
// // //                   <CCard>
// // //                     <CCardImage orientation="top" src={ReactImg} />
// // //                     <CCardBody>
// // //                       <CCardTitle>Card title</CCardTitle>
// // //                       <CCardText>
// // //                         This is a wider card with supporting text below as a natural lead-in to
// // //                         additional content. This content is a little bit longer.
// // //                       </CCardText>
// // //                     </CCardBody>
// // //                     <CCardFooter>
// // //                       <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                     </CCardFooter>
// // //                   </CCard>
// // //                 </CCol>
// // //                 <CCol xs>
// // //                   <CCard>
// // //                     <CCardImage orientation="top" src={ReactImg} />
// // //                     <CCardBody>
// // //                       <CCardTitle>Card title</CCardTitle>
// // //                       <CCardText>
// // //                         This is a wider card with supporting text below as a natural lead-in to
// // //                         additional content. This content is a little bit longer.
// // //                       </CCardText>
// // //                     </CCardBody>
// // //                     <CCardFooter>
// // //                       <small className="text-body-secondary">Last updated 3 mins ago</small>
// // //                     </CCardFooter>
// // //                   </CCard>
// // //                 </CCol>
// // //               </CRow>
// // //             </DocsExample>
// // //           </CCardBody>
// // //         </CCard>
// // //       </CCol>
// // //     </CRow>
// // //   )
// // // }

// // // export default Cards

// // // import React, { useState } from 'react';

// // // const CouponsPage = () => {
// // //   const [coupons, setCoupons] = useState([]);
// // //   const [newCoupon, setNewCoupon] = useState({
// // //     code: '',
// // //     discount: '',
// // //     expiryDate: '',
// // //   });

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setNewCoupon((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   const handleAddCoupon = () => {
// // //     if (!newCoupon.code || !newCoupon.discount || !newCoupon.expiryDate) {
// // //       alert('Please fill in all fields.');
// // //       return;
// // //     }

// // //     setCoupons((prev) => [...prev, { ...newCoupon, id: Date.now() }]);
// // //     setNewCoupon({ code: '', discount: '', expiryDate: '' });
// // //   };

// // //   const handleDeleteCoupon = (id) => {
// // //     setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
// // //   };

// // //   return (
// // //     <div className="container mt-5">
// // //       <h1 className="h4 fw-bold">Manage Coupons and Discounts</h1>

// // //       {/* Add Coupon Form */}
// // //       <div className="card p-3 mb-4">
// // //         <h2 className="h5">Add New Coupon</h2>
// // //         <div className="row">
// // //           <div className="col-md-4">
// // //             <input
// // //               type="text"
// // //               name="code"
// // //               value={newCoupon.code}
// // //               onChange={handleInputChange}
// // //               placeholder="Coupon Code"
// // //               className="form-control mb-2"
// // //             />
// // //           </div>
// // //           <div className="col-md-4">
// // //             <input
// // //               type="number"
// // //               name="discount"
// // //               value={newCoupon.discount}
// // //               onChange={handleInputChange}
// // //               placeholder="Discount (%)"
// // //               className="form-control mb-2"
// // //             />
// // //           </div>
// // //           <div className="col-md-4">
// // //             <input
// // //               type="date"
// // //               name="expiryDate"
// // //               value={newCoupon.expiryDate}
// // //               onChange={handleInputChange}
// // //               className="form-control mb-2"
// // //             />
// // //           </div>
// // //         </div>
// // //         <button className="btn btn-primary" onClick={handleAddCoupon}>
// // //           Add Coupon
// // //         </button>
// // //       </div>

// // //       {/* Coupons List */}
// // //       <div className="card p-3">
// // //         <h2 className="h5">Existing Coupons</h2>
// // //         {coupons.length === 0 ? (
// // //           <p>No coupons added yet.</p>
// // //         ) : (
// // //           <table className="table">
// // //             <thead>
// // //               <tr>
// // //                 <th>Code</th>
// // //                 <th>Discount (%)</th>
// // //                 <th>Expiry Date</th>
// // //                 <th>Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {coupons.map((coupon) => (
// // //                 <tr key={coupon.id}>
// // //                   <td>{coupon.code}</td>
// // //                   <td>{coupon.discount}</td>
// // //                   <td>{coupon.expiryDate}</td>
// // //                   <td>
// // //                     <button
// // //                       className="btn btn-danger btn-sm"
// // //                       onClick={() => handleDeleteCoupon(coupon.id)}
// // //                     >
// // //                       Delete
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CouponsPage;

// // import React, { useState } from 'react';

// // const CouponsPage = () => {
// //   const [coupons, setCoupons] = useState([]);
// //   const [newCoupon, setNewCoupon] = useState({
// //     code: '',
// //     discount: '',
// //     expiryDate: '',
// //   });

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewCoupon((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleAddCoupon = async () => {
// //     if (!newCoupon.code || !newCoupon.discount || !newCoupon.expiryDate) {
// //       alert('Please fill in all fields.');
// //       return;
// //     }

// //     try {
// //       // Send the new coupon to the server
// //       const response = await fetch('http://localhost:3001/api/coupons', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(newCoupon),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to add coupon');
// //       }

// //       const savedCoupon = await response.json();

// //       // Update the local state with the saved coupon
// //       setCoupons((prev) => [...prev, savedCoupon]);
// //       setNewCoupon({ code: '', discount: '', expiryDate: '' });
// //       alert('Coupon added successfully!');
// //     } catch (error) {
// //       console.error('Error adding coupon:', error);
// //       alert('Failed to add coupon. Please try again.');
// //     }
// //   };

// //   const handleDeleteCoupon = async (id) => {
// //     try {
// //       // Send a delete request to the server
// //       const response = await fetch(`http://localhost:3001/api/coupons/${id}`, {
// //         method: 'DELETE',
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to delete coupon');
// //       }

// //       // Update the local state to remove the deleted coupon
// //       setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
// //       alert('Coupon deleted successfully!');
// //     } catch (error) {
// //       console.error('Error deleting coupon:', error);
// //       alert('Failed to delete coupon. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <h1 className="h4 fw-bold">Manage Coupons and Discounts</h1>

// //       {/* Add Coupon Form */}
// //       <div className="card p-3 mb-4">
// //         <h2 className="h5">Add New Coupon</h2>
// //         <div className="row">
// //           <div className="col-md-4">
// //             <input
// //               type="text"
// //               name="code"
// //               value={newCoupon.code}
// //               onChange={handleInputChange}
// //               placeholder="Coupon Code"
// //               className="form-control mb-2"
// //             />
// //           </div>
// //           <div className="col-md-4">
// //             <input
// //               type="number"
// //               name="discount"
// //               value={newCoupon.discount}
// //               onChange={handleInputChange}
// //               placeholder="Discount (%)"
// //               className="form-control mb-2"
// //             />
// //           </div>
// //           <div className="col-md-4">
// //             <input
// //               type="date"
// //               name="expiryDate"
// //               value={newCoupon.expiryDate}
// //               onChange={handleInputChange}
// //               className="form-control mb-2"
// //             />
// //           </div>
// //         </div>
// //         <button className="btn btn-primary" onClick={handleAddCoupon}>
// //           Add Coupon
// //         </button>
// //       </div>

// //       {/* Coupons List */}
// //       <div className="card p-3">
// //         <h2 className="h5">Existing Coupons</h2>
// //         {coupons.length === 0 ? (
// //           <p>No coupons added yet.</p>
// //         ) : (
// //           <table className="table">
// //             <thead>
// //               <tr>
// //                 <th>Code</th>
// //                 <th>Discount (%)</th>
// //                 <th>Expiry Date</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {coupons.map((coupon) => (
// //                 <tr key={coupon.id}>
// //                   <td>{coupon.code}</td>
// //                   <td>{coupon.discount}</td>
// //                   <td>{coupon.expiryDate}</td>
// //                   <td>
// //                     <button
// //                       className="btn btn-danger btn-sm"
// //                       onClick={() => handleDeleteCoupon(coupon.id)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CouponsPage;

// // import React, { useState, useEffect } from 'react';

// // const CouponsPage = () => {
// //   const [coupons, setCoupons] = useState([]);
// //   const [newCoupon, setNewCoupon] = useState({
// //     code: '',
// //     discount: '',
// //     expiryDate: '',
// //   });

// //   useEffect(() => {
// //     fetchCoupons();
// //   }, []);

// //   const fetchCoupons = async () => {
// //     try {
// //       const response = await fetch('http://localhost:3001/api/coupons');
// //       const data = await response.json();
// //       setCoupons(data);
// //     } catch (error) {
// //       console.error('Error fetching coupons:', error);
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewCoupon((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleAddCoupon = async () => {
// //     if (!newCoupon.code || !newCoupon.discount || !newCoupon.expiryDate) {
// //       alert('Please fill in all fields.');
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://localhost:3001/api/coupons', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(newCoupon),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || 'Failed to add coupon');
// //       }

// //       const savedCoupon = await response.json();
// //       setCoupons((prev) => [...prev, savedCoupon]);
// //       setNewCoupon({ code: '', discount: '', expiryDate: '' });
// //       alert('Coupon added successfully!');
// //     } catch (error) {
// //       console.error('Error adding coupon:', error);
// //       alert(error.message);
// //     }
// //   };

// //   const handleDeleteCoupon = async (id) => {
// //     try {
// //       const response = await fetch(`http://localhost:3001/api/coupons/${id}`, {
// //         method: 'DELETE',
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to delete coupon');
// //       }

// //       setCoupons((prev) => prev.filter((coupon) => coupon._id !== id));
// //       alert('Coupon deleted successfully!');
// //     } catch (error) {
// //       console.error('Error deleting coupon:', error);
// //       alert('Failed to delete coupon. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <h1 className="h4 fw-bold">Manage Coupons and Discounts</h1>

// //       {/* Add Coupon Form */}
// //       <div className="card p-3 mb-4">
// //         <h2 className="h5">Add New Coupon</h2>
// //         <div className="row">
// //           <div className="col-md-4">
// //             <input
// //               type="text"
// //               name="code"
// //               value={newCoupon.code}
// //               onChange={handleInputChange}
// //               placeholder="Coupon Code"
// //               className="form-control mb-2"
// //             />
// //           </div>
// //           <div className="col-md-4">
// //             <input
// //               type="number"
// //               name="discount"
// //               value={newCoupon.discount}
// //               onChange={handleInputChange}
// //               placeholder="Discount (%)"
// //               className="form-control mb-2"
// //             />
// //           </div>
// //           <div className="col-md-4">
// //             <input
// //               type="date"
// //               name="expiryDate"
// //               value={newCoupon.expiryDate}
// //               onChange={handleInputChange}
// //               className="form-control mb-2"
// //             />
// //           </div>
// //         </div>
// //         <button className="btn btn-primary" onClick={handleAddCoupon}>
// //           Add Coupon
// //         </button>
// //       </div>

// //       {/* Coupons List */}
// //       <div className="card p-3">
// //         <h2 className="h5">Existing Coupons</h2>
// //         {coupons.length === 0 ? (
// //           <p>No coupons added yet.</p>
// //         ) : (
// //           <table className="table">
// //             <thead>
// //               <tr>
// //                 <th>Code</th>
// //                 <th>Discount (%)</th>
// //                 <th>Expiry Date</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {coupons.map((coupon) => (
// //                 <tr key={coupon._id}>
// //                   <td>{coupon.code}</td>
// //                   <td>{coupon.discount}</td>
// //                   <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
// //                   <td>
// //                     <button
// //                       className="btn btn-danger btn-sm"
// //                       onClick={() => handleDeleteCoupon(coupon._id)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CouponsPage;

// import React, { useState, useEffect } from 'react';

// const CouponsPage = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [technologies, setTechnologies] = useState([]); // List of available technologies
//   const [newCoupon, setNewCoupon] = useState({
//     code: '',
//     discount: '',
//     expiryDate: '',
//     technology: '', // Add technology field
//   });

//   useEffect(() => {
//     fetchCoupons();
//     fetchTechnologies(); // Fetch available technologies
//   }, []);

//   const fetchCoupons = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/coupons');
//       const data = await response.json();
//       setCoupons(data);
//     } catch (error) {
//       console.error('Error fetching coupons:', error);
//     }
//   };

//   const fetchTechnologies = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/options'); // Fetch options from the server
//       const data = await response.json();

//       if (data.technologyOptions) {
//         // Extract technology names from the technologyOptions object
//         const technologies = Object.keys(data.technologyOptions).map((key) => ({
//           id: key, // Use the key as the ID
//           name: key, // Use the key as the name
//         }));
//         setTechnologies(technologies); // Update the state with the technology options
//       }
//     } catch (error) {
//       console.error('Error fetching technologies:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewCoupon((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddCoupon = async () => {
//     if (!newCoupon.code || !newCoupon.discount || !newCoupon.expiryDate || !newCoupon.technology) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/api/coupons', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newCoupon),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to add coupon');
//       }

//       const savedCoupon = await response.json();
//       setCoupons((prev) => [...prev, savedCoupon]);
//       setNewCoupon({ code: '', discount: '', expiryDate: '', technology: '' });
//       alert('Coupon added successfully!');
//     } catch (error) {
//       console.error('Error adding coupon:', error);
//       alert(error.message);
//     }
//   };

//   const handleDeleteCoupon = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/coupons/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete coupon');
//       }

//       setCoupons((prev) => prev.filter((coupon) => coupon._id !== id));
//       alert('Coupon deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting coupon:', error);
//       alert('Failed to delete coupon. Please try again.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="h4 fw-bold">Manage Coupons and Discounts</h1>

//       {/* Add Coupon Form */}
//       <div className="card p-3 mb-4">
//         <h2 className="h5">Add New Coupon</h2>
//         <div className="row">
//           <div className="col-md-3">
//             <input
//               type="text"
//               name="code"
//               value={newCoupon.code}
//               onChange={handleInputChange}
//               placeholder="Coupon Code"
//               className="form-control mb-2"
//             />
//           </div>
//           <div className="col-md-3">
//             <input
//               type="number"
//               name="discount"
//               value={newCoupon.discount}
//               onChange={handleInputChange}
//               placeholder="Discount (%)"
//               className="form-control mb-2"
//             />
//           </div>
//           <div className="col-md-3">
//             <input
//               type="date"
//               name="expiryDate"
//               value={newCoupon.expiryDate}
//               onChange={handleInputChange}
//               className="form-control mb-2"
//             />
//           </div>
//           <div className="col-md-3">
//             <select
//               name="technology"
//               value={newCoupon.technology}
//               onChange={handleInputChange}
//               className="form-control mb-2"
//             >
//               <option value="">Select Technology</option>
//               {technologies.map((tech) => (
//                 <option key={tech.id} value={tech.name}>
//                   {tech.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <button className="btn btn-primary" onClick={handleAddCoupon}>
//           Add Coupon
//         </button>
//       </div>

//       {/* Coupons List */}
//       <div className="card p-3">
//         <h2 className="h5">Existing Coupons</h2>
//         {coupons.length === 0 ? (
//           <p>No coupons added yet.</p>
//         ) : (
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Code</th>
//                 <th>Discount (%)</th>
//                 <th>Expiry Date</th>
//                 <th>Technology</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {coupons.map((coupon) => (
//                 <tr key={coupon._id}>
//                   <td>{coupon.code}</td>
//                   <td>{coupon.discount}</td>
//                   <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
//                   <td>{coupon.technology}</td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDeleteCoupon(coupon._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CouponsPage;


import React, { useState, useEffect } from 'react';

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    expiryDate: '',
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/coupons');
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCoupon = async () => {
    if (!newCoupon.code || !newCoupon.discount || !newCoupon.expiryDate) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCoupon),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add coupon');
      }

      const savedCoupon = await response.json();
      setCoupons((prev) => [...prev, savedCoupon]);
      setNewCoupon({ code: '', discount: '', expiryDate: '' });
      alert('Coupon added successfully!');
    } catch (error) {
      console.error('Error adding coupon:', error);
      alert(error.message);
    }
  };

  const handleDeleteCoupon = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/coupons/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete coupon');
      }

      setCoupons((prev) => prev.filter((coupon) => coupon._id !== id));
      alert('Coupon deleted successfully!');
    } catch (error) {
      console.error('Error deleting coupon:', error);
      alert('Failed to delete coupon. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="h4 fw-bold">Manage Coupons and Discounts</h1>

      {/* Add Coupon Form */}
      <div className="card p-3 mb-4">
        <h2 className="h5">Add New Coupon</h2>
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              name="code"
              value={newCoupon.code}
              onChange={handleInputChange}
              placeholder="Coupon Code"
              className="form-control mb-2"
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="discount"
              value={newCoupon.discount}
              onChange={handleInputChange}
              placeholder="Discount (%)"
              className="form-control mb-2"
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              name="expiryDate"
              value={newCoupon.expiryDate}
              onChange={handleInputChange}
              className="form-control mb-2"
            />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleAddCoupon}>
          Add Coupon
        </button>
      </div>

      {/* Coupons List */}
      <div className="card p-3">
        <h2 className="h5">Existing Coupons</h2>
        {coupons.length === 0 ? (
          <p>No coupons added yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount (%)</th>
                <th>Expiry Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td>{coupon.code}</td>
                  <td>{coupon.discount}</td>
                  <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteCoupon(coupon._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CouponsPage;