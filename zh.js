function main(config) {
  // 1. 基础全局配置覆盖
  config["port"] = 7890;
  config["socks-port"] = 7891;
  config["redir-port"] = 7892;
  config["mixed-port"] = 7893;
  config["tproxy-port"] = 7894;
  config["allow-lan"] = true;
  config["bind-address"] = "*";
  config["ipv6"] = false;
  config["unified-delay"] = true;
  config["tcp-concurrent"] = true;
  config["log-level"] = "warning";
  config["find-process-mode"] = "off";
  config["global-client-fingerprint"] = "chrome";
  config["keep-alive-idle"] = 15;
  config["keep-alive-interval"] = 15;
  config["disable-keep-alive"] = false;

  config["profile"] = {
    "store-selected": true,
    "store-fake-ip": true,
  };

  config["external-controller"] = "0.0.0.0:9090";
  config["secret"] = "";
  config["external-ui"] = "/etc/mihomo/run/ui";
  config["external-ui-name"] = "zashboard";
  config["external-ui-url"] =
    "https://ghfast.top/https://github.com/Zephyruso/zashboard/archive/refs/heads/gh-pages.zip";

  // 2. 嗅探配置 (Sniffer)
  config["sniffer"] = {
    enable: true,
    sniff: {
      HTTP: {
        ports: [80, "8080-8880"],
        "override-destination": true,
      },
      TLS: {
        ports: [443, 8443],
      },
      QUIC: {
        ports: [443, 8443],
      },
    },
    "force-domain": ["+.v2ex.com"],
    "skip-domain": [
      "dlg.io.mi.com",
      "+.push.apple.com",
      "+.apple.com",
      "+.wechat.com",
      "+.qpic.cn",
      "+.qq.com",
      "+.wechatapp.com",
      "+.vivox.com",
      "+.oray.com",
      "+.sunlogin.net",
      "+.msftconnecttest.com",
      "+.msftncsi.com",
    ],
  };

  // 3. Tun 配置
  config["tun"] = {
    enable: false,
    stack: "gvisor",
    "dns-hijack": ["any:53", "tcp://any:53"],
    "auto-route": true,
    "auto-redirect": true,
    "auto-detect-interface": true,
  };

  // 4. DNS 配置
  config["dns"] = {
    enable: true,
    listen: "0.0.0.0:1053",
    ipv6: false,
    "respect-rules": true,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "28.0.0.1/8",
    "fake-ip-filter-mode": "blacklist",
    "fake-ip-filter": [
      "+.services.googleapis.cn",
      "+.xn--ngstr-lra8j.com",
      "time.*.com",
      "+.pool.ntp.org",
      "+.ntp.tencent.com",
      "+.ntp1.aliyun.com",
      "+.ntp.ntsc.ac.cn",
      "+.cn.ntp.org.cn",
    ],
    "default-nameserver": ["223.5.5.5"],
    "proxy-server-nameserver": ["https://dns.alidns.com/dns-query"],
    nameserver: ["61.139.2.69", "218.6.200.139"],
  };

  // 5. 规则集提供者 (Rule Providers)
  // 定义通用参数
  const providerCommon = {
    type: "http",
    interval: 86400,
    format: "mrs",
  };

  if (!config["rule-providers"]) {
    config["rule-providers"] = {};
  }

  config["rule-providers"] = Object.assign(config["rule-providers"], {
    ai: {
      ...providerCommon,
      behavior: "domain",
      url: "https://ghfast.top/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ai-!cn.mrs",
    },
  });

  // 6. 代理组 (Proxy Groups)
  // 注意：这里保留了你 YAML 中写死的特定节点名称(如 "Bage HKS")
  // 如果这些节点不在订阅列表中，策略组可能会为空或报错。
  config["proxy-groups"] = [
    {
      name: "🚀 节点选择",
      type: "select",
      proxies: [
        "♻️ 自动选择",
        "DIRECT",
        "BGP.GD CT-Bage HKS",
        "Sharon HK STD",
        "Sharon HK STD-Bage HKS",
        "YXVM HK Vol 01",
        "YXVM HK Vol 02",
        "YXVM HK Vol-Bage HKS",
        "BGP.GD CT-Bage SGS",
        "Sharon HK STD-Bage SGS",
        "Bage HKS",
      ],
    },
    {
      name: "♻️ 自动选择",
      type: "url-test",
      url: "http://www.apple.com/library/test/success.html",
      interval: 300,
      tolerance: 50,
      proxies: [
        "BGP.GD CT-Bage HKS",
        "Sharon HK STD",
        "Sharon HK STD-Bage HKS",
        "YXVM HK Vol 01",
        "YXVM HK Vol 02",
        "YXVM HK Vol-Bage HKS",
        "BGP.GD CT-Bage SGS",
        "Sharon HK STD-Bage SGS",
        "Bage HKS",
      ],
    },
    {
      name: "✈️ AI服务",
      type: "url-test",
      url: "http://www.apple.com/library/test/success.html",
      interval: 300,
      tolerance: 50,
      proxies: ["BGP.GD CT-Bage SGS", "Sharon HK STD-Bage SGS"],
    },
  ];

  // 7. 规则 (Rules)
  // 由于你的规则有几千行，为了脚本整洁，这里演示了部分规则。
  // 实际使用时，请将你 YAML 中的 rules 列表粘贴到下面的 bigRules 数组中。
  const bigRules = [
    "RULE-SET,ai,✈️ AI服务",
    "DOMAIN,cdn.lilyemby.my,DIRECT",
    "DOMAIN-SUFFIX,cdn.lilyemby.my,DIRECT",
    "DOMAIN-SUFFIX,cdn.lilyemby.com,DIRECT",
    "DOMAIN-SUFFIX,hkcdn.longemby.com,DIRECT",
    "DOMAIN-SUFFIX,jpcdn.longemby.com,DIRECT",
    "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,🚀 节点选择",
    "DOMAIN-SUFFIX,services.googleapis.cn,🚀 节点选择",
    "IP-CIDR,120.232.181.162/32,🚀 节点选择,no-resolve",
    // ... 
    // 请在此处粘贴您中间那几千行规则 (DOMAIN-SUFFIX, IP-CIDR 等)
    // ...
    "GEOIP,CN,DIRECT,no-resolve",
    "MATCH,🚀 节点选择",
  ];

  // 将规则赋值给配置
  config["rules"] = bigRules;

  return config;
}