// import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
// import TextEditor from "@centic-scoring/components/TextEditor";
// import { chainsConfig } from "@centic-scoring/config/chain";
// import { KPIDetailRow } from "@centic-scoring/module/ForProject/Affiliate/KOLsMatcher/KOLsConnect/components/NewOfferForm/steps/Step4/Requirements";
// import { useKOLOfferSelector } from "@centic-scoring/redux/hook";
// import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
// import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
// import { capitalize } from "lodash";
// import { useMemo, useState } from "react";
// import OfferLetter from "./Letter";
// import { toast } from "react-toastify";
// import { KOLConnectAPI } from "@centic-scoring/api/services/kols/affiliate";
// import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
// import { LoadingButton } from "@mui/lab";

// export default function Offer() {
//   const { offerForm, contact, kolDetailStatus } = useKOLOfferSelector();
//   const [open, setOpen] = useState<boolean>(false);
//   const { id } = useURLQuery();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [content, setContent] = useState<string>("");
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleGenLetter = async () => {
//     setLoading(true);
//     try {
//       const res = await KOLConnectAPI.genLetter(id, {
//         offer_link: offerForm.featuredLink,
//         contact: `Twitter: ${contact.data?.twitter} \n Telegram: ${contact.data?.telegram}  \n Website: ${contact.data?.website}`,
//       });
//       setContent(res.content);
//     } catch (error) {
//       toast.error((error as Error).message);
//     }
//     setLoading(false);
//   };

//   const info = useMemo(() => {
//     return {
//       Phone: contact.data?.phone,
//       Web: contact.data?.website,
//       Twitter: contact.data?.twitter,
//       Telegram: contact.data?.telegram,
//       Email: contact.data?.email,
//     };
//   }, [contact]);
//   return (
//     <Paper sx={{ px: 5, py: 6, width: "auto", minHeight: "400px" }}>
//       <ComponentWithStatus status={kolDetailStatus}>
//         <Typography variant="h2" mb={6} sx={{ textAlign: "center", textTransform: "uppercase" }}>
//           {offerForm.description?.title} OFFER
//         </Typography>
//         <Paper sx={{ backgroundColor: "background.default", p: 4 }}>
//           <Box>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Avatar
//                 src={offerForm.description.logo}
//                 sx={{ width: "38px", height: "38px", mr: 2 }}
//               />
//               <Typography variant="h2" fontWeight={600}>
//                 {offerForm.description.title}
//               </Typography>
//             </Box>
//             <TextEditor
//               onValueChange={() => {}}
//               initValue={offerForm.description.text}
//               inputType="markdown"
//               viewMode
//             />
//           </Box>
//           <Box>
//             <Typography variant="body1" fontWeight={600}>
//               REQUIREMENTS
//             </Typography>
//             <Box>
//               <TextEditor
//                 onValueChange={() => {}}
//                 initValue={offerForm.customizedRequirement.text}
//                 viewMode
//                 inputType="markdown"
//               />
//               <Box
//                 sx={{
//                   border: "1px solid",
//                   borderColor: "text.active2",
//                   p: 3,
//                   borderRadius: 2,
//                 }}
//               >
//                 <Typography variant="h6" color="text.secondary" mb={3}>
//                   KPI Detail
//                 </Typography>
//                 <Box
//                   sx={{
//                     "& .kpi-detail-row": {
//                       py: 3,
//                       borderBottom: "1px solid",
//                       borderColor: "text.active2",
//                     },
//                     "& .kpi-detail-row:last-child": {
//                       borderBottom: "none",
//                     },
//                   }}
//                 >
//                   {Object.values(offerForm.kpiExpect).map((kpi, index) => {
//                     return (
//                       <KPIDetailRow
//                         key={index}
//                         type={kpi.require.type}
//                         unit={kpi.timeRequire.unit}
//                         value={kpi.require.value}
//                         valueUnit={kpi.timeRequire.value}
//                       />
//                     );
//                   })}
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//           <Box mt={5}>
//             <Typography variant="body1" fontWeight={600} mb={5}>
//               PAYMENTS
//             </Typography>
//             <Box>
//               {offerForm.payment.type === "manual" && (
//                 <Typography color={"text.primary"} my={4}>
//                   {offerForm.payment.rule.stringValue}
//                 </Typography>
//               )}
//               <Box
//                 sx={{
//                   border: "1px solid",
//                   borderColor: "text.active2",
//                   p: 3,
//                   borderRadius: 2,
//                 }}
//               >
//                 <Typography variant="h6" color="text.secondary" mb={3}>
//                   Payment detail
//                 </Typography>
//                 <Box
//                   sx={{
//                     "& .kpi-detail-row": {
//                       py: 3,
//                       borderBottom: "1px solid",
//                       borderColor: "text.active2",
//                     },
//                     "& .kpi-detail-row:last-child": {
//                       borderBottom: "none",
//                     },
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       flexWrap: "wrap",
//                       justifyContent: "space-between",
//                     }}
//                     className="kpi-detail-row"
//                   >
//                     <Typography color={"text.label1"}>Total Token:</Typography>
//                     <Typography fontWeight={500} color="text.primary">
//                       {`${offerForm.payment.amount} ${offerForm.payment.tokenName}`}
//                     </Typography>
//                   </Box>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       flexWrap: "wrap",
//                       justifyContent: "space-between",
//                     }}
//                     className="kpi-detail-row"
//                   >
//                     <Typography color={"text.label1"}>Chain:</Typography>
//                     <Typography fontWeight={500} color="text.primary">
//                       {chainsConfig[offerForm.payment.chains || ""]?.name}
//                     </Typography>
//                   </Box>
//                 </Box>
//                 <Typography variant="h6" color="text.secondary" my={3}>
//                   Bonus rewards
//                 </Typography>
//                 <Box
//                   sx={{
//                     "& .kpi-detail-row": {
//                       py: 3,
//                       borderBottom: "1px solid",
//                       borderColor: "text.active2",
//                     },
//                     "& .kpi-detail-row:last-child": {
//                       borderBottom: "none",
//                     },
//                   }}
//                 >
//                   {Object.values(offerForm.payment.bonus).map((v, index) => {
//                     return (
//                       <Box
//                         key={index}
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           flexWrap: "wrap",
//                           justifyContent: "space-between",
//                         }}
//                         className="kpi-detail-row"
//                       >
//                         <Grid container spacing={2}>
//                           <Grid item xs={12} sm={4}>
//                             <Typography color={"text.label1"}>{capitalize(v.goal)}</Typography>
//                           </Grid>
//                           <Grid item xs={12} sm={4}>
//                             <Typography fontWeight={500} color={"text.primary"}>
//                               {`${formatNumber(v.kpi.value)} ${capitalize(
//                                 v.kpi.type.replace("-", " ")
//                               )}`}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={12} sm={2}>
//                             <Typography color={"text.label1"}>Reward:</Typography>
//                           </Grid>
//                           <Grid item xs={12} sm={2}>
//                             <Typography fontWeight={500} color={"text.primary"}>
//                               {`${v.reward}%`}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                       </Box>
//                     );
//                   })}
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//           <Box mt={5}>
//             <Typography variant="body1" fontWeight={600} mb={5}>
//               CONTACT INFORMATION
//             </Typography>
//             {Object.entries(info).map(([k, v], index) => {
//               return (
//                 <Box key={index} my={1}>
//                   {v && (
//                     <Box sx={{ display: "flex", alignItems: "flex-start" }}>
//                       <Typography
//                         color="text.primary"
//                         mb={1}
//                         sx={{ minWidth: "120px", wordBreak: "break-all" }}
//                       >{`${k}:`}</Typography>
//                       {typeof v === "string" && (
//                         <Typography
//                           color="text.primary"
//                           mb={1}
//                           sx={{ minWidth: "120px", wordBreak: "break-all" }}
//                         >
//                           {v}
//                         </Typography>
//                       )}
//                       {typeof v === "object" && (
//                         <Box>
//                           <Typography key={index} my={0.2} sx={{ wordBreak: "break-all" }}>
//                             {v}
//                           </Typography>
//                         </Box>
//                       )}
//                     </Box>
//                   )}
//                 </Box>
//               );
//             })}
//           </Box>
//         </Paper>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "flex-end",
//             "& .MuiButton-root": {
//               minWidth: "130px",
//             },
//             gap: 1,
//             mt: 3,
//           }}
//         >
//           <Button variant="outlined">Edit</Button>
//           <LoadingButton
//             loading={loading}
//             variant="contained"
//             onClick={() => {
//               handleOpen();
//               handleGenLetter();
//             }}
//           >
//             Connect KOLs
//           </LoadingButton>
//         </Box>
//         <OfferLetter open={open} handleClose={handleClose} content={content} />
//       </ComponentWithStatus>
//     </Paper>
//   );
// }
