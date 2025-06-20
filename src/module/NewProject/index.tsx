import { BackIcon } from "@centic-scoring/icons";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  RTImportedData,
  RTImportedProject,
  createProject,
  editProjectData,
  fetchImportedDetail,
  fetchImportedProjects,
  handleImportProject,
} from "@centic-scoring/api/services";
import { DataWithStatus } from "@centic-scoring/redux/slices/global";
import { toast } from "react-toastify";
import CenticLoading from "@centic-scoring/components/CenticLoading";
import { RTCreateCampaign, postFiles } from "@centic-scoring/api/services/web3-growth/campaign";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAppDispatch } from "@centic-scoring/redux/hook";
import { setProjectCreatedState } from "@centic-scoring/redux/slices/for-project-common";

//STYLE ************************************************************
const row: SxProps<Theme> = {
  mb: 1,
  px: 3,
};
const label: SxProps<Theme> = {
  mb: 0.5,
};

const CATEGORY_OPTIONS = [
  { value: "Lending", label: "Lending" },
  { value: "Dexes", label: "Dexes" },
  { value: "Yield", label: "Yield" },
  { value: "Liquid Staking", label: "Liquid Staking" },
  { value: "Restaking", label: "Restaking" },
  { value: "Liquid  Restaking", label: "Liquid  Restaking" },
  { value: "Bridge", label: "Bridge" },
  { value: "CDP", label: "CDP" },
  { value: "Services", label: "Services" },
  { value: "Yield Aggregator", label: "Yield Aggregator" },
  { value: "App", label: "App" },
];

const SOURCE_OPTIONS = [
  { value: 1, label: "Create new project" },
  { value: 0, label: "Import from exists project" },
];

const initHelperText = {
  source: " ",
  existProject: " ",
  name: " ",
  projectId: " ",
  visibleType: " ",
  avatar: " ",
};
const VISIBLE_TYPE = [
  { value: 1, label: "Private" },
  { value: 0, label: "Public" },
];

type Props = {
  initData?: {
    editName?: string;
    editDescription?: string;
    editVisible?: string;
    editCategory?: string;
    editAvatar?: string;
  };
  isEdit?: boolean;
  isForProject?: boolean;
};

export default function NewProject({ initData, isEdit, isForProject }: Props) {
  const [isNew, setIsNew] = useState<number>(1);
  const [importProject, setImportProject] = useState<{
    label: string;
    value: string;
    avatar: string;
  }>();
  const [existedProjectOptions, setExistProjectOptions] = useState<
    DataWithStatus<RTImportedProject["projects"]>
  >({ status: "IDLE", data: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  const [avatar, setAvatar] = useState<FileList>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const { id } = useURLQuery();
  const [helperText, setHelperText] = useState<{
    source: string;
    existProject: string;
    name: string;
    projectId: string;
    visibleType: string;
    avatar: string;
  }>(initHelperText);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [importedData, setImportedData] = useState<DataWithStatus<RTImportedData>>({
    status: "IDLE",
    data: {} as RTImportedData,
  });
  const dispatch = useAppDispatch();

  const onAvatarClick = () => {
    inputRef?.current?.click();
  };

  const fetchImportedProjectsDetail = useCallback(async (id: string) => {
    try {
      setImportedData((prev) => ({ ...prev, status: "PROCESSING" }));
      const res = await fetchImportedDetail(id);
      setImportedData({ status: "SUCCESS", data: res });
    } catch (error) {
      setImportedData((prev) => ({ ...prev, status: "FAILED" }));
    }
  }, []);

  useEffect(() => {
    if (initData && isEdit) {
      setName(initData.editName || "");
      setCategory(initData.editCategory || "");
      setDescription(initData.editDescription || "");
      setIsPrivate(initData.editVisible === "private" ? 1 : 0);
      setPreviewImage(initData.editAvatar || "");
    }
  }, [initData, isEdit]);

  useEffect(() => {
    if (importedData.status === "SUCCESS") {
      setName(importedData.data?.name || "");
      setProjectId(importedData.data?.projectId || "");
      setDescription(importedData.data?.description || "");
      setCategory(importedData?.data?.category || "");
    }
  }, [importedData]);

  useEffect(() => {
    if (importProject) {
      fetchImportedProjectsDetail(importProject.value || "");
    }
  }, [fetchImportedProjectsDetail, importProject]);

  useEffect(() => {
    const fetchExistedOption = async () => {
      try {
        setExistProjectOptions((prev) => ({ ...prev, status: "PROCESSING" }));
        const res = await fetchImportedProjects();
        setExistProjectOptions({ status: "SUCCESS", data: res?.projects || [] });
      } catch (error) {
        setExistProjectOptions((prev) => ({ ...prev, status: "FAILED" }));
      }
    };
    if (!isNew && !existedProjectOptions.data?.length) {
      fetchExistedOption();
    }
  }, [isNew, existedProjectOptions.data]);

  const handleCheckInput = () => {
    setHelperText(initHelperText);
    let valid = true;
    if (!name) {
      setHelperText((prev) => ({
        ...prev,
        name: "Project Name is required",
      }));
      valid = false;
    }
    if (!isNew && !importProject && !isEdit) {
      setHelperText((prev) => ({
        ...prev,
        existProject: "Project ID is required",
      }));
      valid = false;
    }
    if (!projectId && !isEdit) {
      setHelperText((prev) => ({
        ...prev,
        projectId: "Project ID is required",
      }));
      valid = false;
    }
    if (!avatar && !isEdit) {
      setHelperText((prev) => ({
        ...prev,
        avatar: "Project Avatar is required",
      }));
      valid = false;
    }
    return valid;
  };

  const handleFinish = async () => {
    if (!handleCheckInput()) {
      return;
    } else {
      setLoading(true);
      try {
        let filesRes = {} as RTCreateCampaign | undefined;
        if (avatar) {
          filesRes = await postFiles(avatar);
        }
        if (!isEdit) {
          if (isNew || isForProject) {
            await createProject({
              category: category,
              description: description,
              id: projectId,
              imgUrl: filesRes?.urls![0] || "",
              name: name,
              visible: isPrivate ? "private" : "public",
            });
            toast.success("Create Project Successfully");
            if (isForProject) {
              dispatch(setProjectCreatedState(true));
              return router.back();
            }
            router.push(`/projects/settings/${id}`);
          } else {
            await handleImportProject({
              category: category,
              description: description,
              id: projectId,
              imgUrl: filesRes?.urls![0] || "",
              name: name,
              visible: isPrivate ? "private" : "public",
              importedFrom: importProject?.value || "",
            });
            toast.success("Create Project Successfully");
          }
        } else {
          await editProjectData({
            category: category,
            description: description,
            id: id,
            imgUrl: (filesRes?.urls || [])[0] || previewImage,
            name: name,
            visible: isPrivate ? "private" : "public",
          });
          router.back();
          toast.success("Edit Project Successfully");
        }
        // router.push("web3-growth");
      } catch (error) {
        toast.error((error as Error).message);
      }
      setLoading(false);
    }
  };

  const LoadingData = useMemo(() => {
    if (importedData.status === "PROCESSING") {
      return <CenticLoading size={20} />;
    } else {
      return null;
    }
  }, [importedData]);

  const handleBack = useCallback(() => {
    if (isEdit) {
      router.push(`/projects/setting/${id}`);
    } else {
      router.push("/projects");
    }
  }, [id, isEdit, router]);
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
        <Link href="/projects">
          <IconButton>
            <BackIcon />
          </IconButton>
        </Link>
        {!isEdit ? (
          <Typography variant="h3" color={"text.primary"}>
            Create New Project
          </Typography>
        ) : (
          <Typography variant="h3" color={"text.primary"}>
            Edit Project
          </Typography>
        )}
      </Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" color="secondary" mb={5}>
          General Info
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                borderRight: "1px solid #344456",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  //   cursor: "pointer",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "128px",
                  minHeight: "128px",
                  width: "50%",
                  backgroundColor: "#17242C",
                  border: "1px solid ",
                  borderColor: helperText.avatar?.trim() ? "red" : "text.active2",
                }}
              >
                {previewImage && (
                  <Avatar src={previewImage} sx={{ width: "100%", height: "100%" }} />
                )}
                {!previewImage && <CameraAltIcon />}
              </Box>

              <Typography variant="extraSmall" color={"error"} mt={1} mb={-1}>
                {helperText.avatar || " "}
              </Typography>
              <Button onClick={onAvatarClick} variant="outlined" sx={{ mt: 2 }}>
                Upload
              </Button>
              <input
                type="file"
                multiple={false}
                style={{ display: "none" }}
                accept="image/*"
                ref={inputRef}
                onChange={(e) => {
                  setAvatar(e?.target?.files || undefined);
                  if (e?.target?.files![0]) {
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            {!isEdit && (
              <Box sx={row}>
                <Typography sx={label} variant="body2" color="text.secondary">
                  Source
                </Typography>
                <TextField
                  value={isNew}
                  onChange={(e) => {
                    setIsNew(Number(e.target.value));
                  }}
                  select
                  fullWidth
                  error={Boolean(helperText?.source?.trim())}
                  helperText={helperText?.source}
                >
                  {SOURCE_OPTIONS.map((i, index) => {
                    return (
                      <MenuItem key={index} value={i.value}>
                        {i.label}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Box>
            )}
            {!isNew && (
              <Box sx={row}>
                <Typography sx={label} variant="body2" color="text.secondary">
                  Select exists project
                </Typography>
                <Autocomplete
                  fullWidth
                  value={importProject}
                  onChange={(e, newValue) => {
                    setImportProject(newValue || undefined);
                  }}
                  options={
                    existedProjectOptions?.data?.map((i) => ({
                      label: i.name,
                      value: i.id,
                      avatar: i.imgUrl,
                    })) || []
                  }
                  slotProps={{
                    paper: {
                      style: {
                        backgroundColor: "#030B10",
                        boxShadow: "0px 2px 8px 0px #5185AA66",
                      },
                      className: "custom-scrollbar",
                    },
                  }}
                  renderOption={(props, option) => (
                    <MenuItem
                      sx={{
                        "& > img": { mr: 2, flexShrink: 0 },
                        "&:hover": {
                          fontWeight: 600,
                        },
                      }}
                      {...props}
                    >
                      <Avatar sx={{ width: "20px", height: "20px", mr: 2 }} src={option.avatar} />{" "}
                      {option.label}
                    </MenuItem>
                  )}
                  ListboxProps={{
                    style: {
                      backgroundColor: "background.primary",
                    },
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        variant="outlined"
                        color="primary"
                        sx={{ fontWeight: 500 }}
                        {...params}
                        fullWidth
                        InputProps={{
                          ...params.InputProps,
                          ...(existedProjectOptions.status === "PROCESSING" && {
                            startAdornment: <CenticLoading size={20} />,
                          }),
                        }}
                        error={Boolean(helperText.existProject?.trim())}
                        helperText={helperText.existProject}
                      />
                    );
                  }}
                />
              </Box>
            )}
            <Grid container spacing={2} sx={{ ...row }}>
              <Grid item xs={12} sm={isEdit ? 12 : 6}>
                <Typography sx={label} variant="body2" color="text.secondary">
                  Name
                </Typography>
                <TextField
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={Boolean(helperText?.name?.trim())}
                  helperText={helperText?.name}
                  InputProps={{ startAdornment: LoadingData }}
                />
              </Grid>
              {!isEdit && (
                <Grid item xs={12} sm={6}>
                  <Typography sx={label} variant="body2" color="text.secondary">
                    Project ID
                  </Typography>
                  <TextField
                    fullWidth
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    error={Boolean(helperText?.projectId?.trim())}
                    helperText={helperText?.projectId}
                    InputProps={{ startAdornment: LoadingData }}
                  />
                </Grid>
              )}
            </Grid>
            <Box sx={row}>
              <Typography sx={label} variant="body2" color="text.secondary">
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                maxRows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{ startAdornment: LoadingData }}
              />
            </Box>
            <Grid container spacing={2} sx={{ ...row, mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Typography sx={label} variant="body2" color="text.secondary">
                  Visible Type
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={isPrivate}
                  onChange={(e) => setIsPrivate(Number(e.target.value))}
                >
                  {VISIBLE_TYPE.map((i) => {
                    return (
                      <MenuItem key={i.value} value={i.value}>
                        {i.label}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={label} variant="body2" color="text.secondary">
                  Category
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  InputProps={{ startAdornment: LoadingData }}
                >
                  {CATEGORY_OPTIONS.map((i) => {
                    return (
                      <MenuItem key={i.value} value={i.value}>
                        {i.label}
                      </MenuItem>
                    );
                  })}
                </TextField>
                <Box
                  sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mt: 5 }}
                >
                  <Button
                    size="medium"
                    variant="outlined"
                    sx={{ mr: 1, minWidth: "120px" }}
                    onClick={handleBack}
                  >
                    Cancel
                  </Button>

                  <LoadingButton
                    loading={loading}
                    size="medium"
                    variant="contained"
                    sx={{ minWidth: "120px" }}
                    onClick={handleFinish}
                  >
                    Finish
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
