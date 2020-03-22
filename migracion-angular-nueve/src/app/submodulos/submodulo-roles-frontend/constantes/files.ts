import { TreeNode } from 'primeng/api';

export const FILES: TreeNode[] = [
  {
    label: 'Documents',
    expandedIcon: 'fa fa-arrow-down',
    collapsedIcon: 'fa fa-arrow-right',
    children: [],
  },
  {
    label: 'Pictures',
    expandedIcon: 'fa fa-arrow-down',
    collapsedIcon: 'fa fa-arrow-right',
    children: [
      { label: 'barcelona.jpg', icon: 'fa fa-file-image-o' },
      { label: 'logo.jpg', icon: 'fa fa-file-image-o' },
      { label: 'primeui.png', icon: 'fa fa-file-image-o' },
    ],
  },
  {
    label: 'Movies',
    expandedIcon: 'fa fa-arrow-down',
    collapsedIcon: 'fa fa-arrow-right',
    children: [
      {
        label: 'Al Pacino',
        // tslint:disable-next-line:max-line-length
        children: [
          { label: 'Scarface', icon: 'fa fa-file-video-o' },
          { label: 'Serpico', icon: 'fa fa-file-video-o' },
        ],
      },
      {
        label: 'Robert De Niro',
        // tslint:disable-next-line:max-line-length
        children: [
          { label: 'Goodfellas', icon: 'fa fa-file-video-o' },
          { label: 'Untouchables', icon: 'fa fa-file-video-o' },
        ],
      },
    ],
  },
];
