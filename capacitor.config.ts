import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'org.suspiciouslycool.mess',
	appName: 'mess',
	webDir: 'build',
	server: {
		androidScheme: 'https'
	}
};

export default config;
